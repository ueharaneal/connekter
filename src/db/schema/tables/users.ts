import {
  timestamp,
  pgTable,
  text,
  pgEnum,
  type AnyPgColumn,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql, SQL } from "drizzle-orm";

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable(
  "user",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID())
      .notNull(),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
    role: roleEnum("role").notNull().default("user"),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(lower(table.email)),
  }),
);

export type User = typeof users.$inferSelect;
