import { defineConfig } from "drizzle-kit";

interface DBCredentials {
  url: string;
}

export default defineConfig({
  schema: "./src/server/db/schema/*", //separate the schemas
  dialect: "postgresql",
  extensionsFilters: ["postgis"],
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL,
  } as DBCredentials,
  out: "./src/server/drizzle",
});
