import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from "drizzle-orm";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { ssl: "require" });

// Cache the database connection in development
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? client;
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

const db = drizzle(conn, { schema });

export default db;

///////// InferQueryModel type helper //////////////

type Schema = typeof schema;
type TablesWithRelations = ExtractTablesWithRelations<Schema>;

type IncludeRelation<TableName extends keyof TablesWithRelations> =
  DBQueryConfig<
    "one" | "many",
    boolean,
    TablesWithRelations,
    TablesWithRelations[TableName]
  >["with"];

type IncludeColumns<TableName extends keyof TablesWithRelations> =
  DBQueryConfig<
    "one" | "many",
    boolean,
    TablesWithRelations,
    TablesWithRelations[TableName]
  >["columns"];

export type InferQueryModel<
  TableName extends keyof TablesWithRelations,
  Options extends {
    columns?: IncludeColumns<TableName>;
    with?: IncludeRelation<TableName>;
  } = {},
> = BuildQueryResult<
  TablesWithRelations,
  TablesWithRelations[TableName],
  {
    columns: Options["columns"];
    with: Options["with"];
  }
>;
