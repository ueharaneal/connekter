import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

const drizzleConfig = {
  schema: "./src/server/db/schema",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL as string },
} satisfies Config;

export default defineConfig(drizzleConfig);
