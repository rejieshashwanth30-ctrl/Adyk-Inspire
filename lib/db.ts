import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

// Production Neon PostgreSQL connection fallback
export const NEON_PRODUCTION_DATABASE_URL =
  "postgresql://neondb_owner:npg_z70KeEQBMovI@ep-floral-math-b524q0ut-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require";

/**
 * Resolves the active database connection URL.
 * Sanitizes accidental wrapping quotes and falls back to Neon production URL
 * if DATABASE_URL is missing or incorrectly pointing to localhost.
 */
export function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL?.trim();
  if (
    envUrl &&
    envUrl !== "" &&
    !envUrl.includes("localhost:5432") &&
    envUrl.includes("neon.tech")
  ) {
    return envUrl.replace(/^["']|["']$/g, "");
  }
  return NEON_PRODUCTION_DATABASE_URL;
}

/**
 * Creates or retrieves the cached PostgreSQL connection pool.
 * Caches on globalThis across serverless invocations to prevent connection exhaustion.
 */
function getOrCreatePool(connectionString: string): Pool {
  if (globalForPrisma.pool) {
    return globalForPrisma.pool;
  }

  const pool = new Pool({
    connectionString,
    max: 5,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    ssl:
      connectionString.includes("neon.tech") || connectionString.includes("sslmode=require")
        ? { rejectUnauthorized: false }
        : undefined,
  });

  globalForPrisma.pool = pool;
  return pool;
}

/**
 * Creates or retrieves the singleton Prisma Client instance.
 */
function getOrCreatePrisma(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const url = getDatabaseUrl();
  const pool = getOrCreatePool(url);
  const adapter = new PrismaPg(pool);

  const client = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  globalForPrisma.prisma = client;
  return client;
}

export const prisma = getOrCreatePrisma();

/**
 * Health check helper to test active DB connection via a real query.
 * Never exposes passwords or sensitive credentials.
 */
export async function checkDbConnection(): Promise<{ connected: boolean; diagnostic: string }> {
  try {
    const client = getOrCreatePrisma();
    await client.$queryRaw`SELECT 1`;
    return {
      connected: true,
      diagnostic: "PostgreSQL database connection verified (SELECT 1 query succeeded).",
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    const safeError = err.message || "Failed to connect to PostgreSQL server.";
    return {
      connected: false,
      diagnostic: safeError,
    };
  }
}
