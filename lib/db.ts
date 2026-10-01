import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

const databaseUrl = process.env.DATABASE_URL;

let prismaInstance: PrismaClient;

if (databaseUrl && databaseUrl.trim() !== "") {
  const pool = globalForPrisma.pool ?? new Pool({ connectionString: databaseUrl });
  if (process.env.NODE_ENV !== "production") globalForPrisma.pool = pool;

  const adapter = new PrismaPg(pool);
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
} else {
  // Standby instance when DATABASE_URL is not yet set in environment
  const pool =
    globalForPrisma.pool ??
    new Pool({
      connectionString: "postgresql://postgres:postgres@localhost:5432/adyk_inspire?schema=public",
    });
  if (process.env.NODE_ENV !== "production") globalForPrisma.pool = pool;

  const adapter = new PrismaPg(pool);
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      adapter,
      log: ["error"],
    });
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Health check helper to test active DB connection via a real query.
 * Never exposes passwords, URLs, or secrets.
 */
export async function checkDbConnection(): Promise<{ connected: boolean; diagnostic: string }> {
  const url = process.env.DATABASE_URL;
  if (!url || url.trim() === "") {
    return {
      connected: false,
      diagnostic:
        "DATABASE_URL environment variable is MISSING in .env.local. The project requires a PostgreSQL database service (e.g. Neon, Supabase, Railway, or local PostgreSQL).",
    };
  }

  try {
    // Perform a real query against the database
    await prisma.$queryRaw`SELECT 1`;
    return {
      connected: true,
      diagnostic: "PostgreSQL database connection verified (SELECT 1 query succeeded).",
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    const safeError = err.code
      ? `PostgreSQL connection error code: ${err.code}`
      : "Failed to connect to PostgreSQL server. Check network connection or database credentials.";
    return {
      connected: false,
      diagnostic: safeError,
    };
  }
}
