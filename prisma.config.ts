import path from "node:path";
import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://neondb_owner:npg_z70KeEQBMovI@ep-floral-math-b524q0ut-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});