import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";
import { env } from "@/env";

const drizzleConfig = {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: { url: env.DATABASE_URL as string },
} satisfies Config;

export default defineConfig(drizzleConfig);
