import {
  timestamp,
  pgTable,
  text,
  boolean,
  point,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { providers } from "./providers";
export const listings = pgTable(
  "listings",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID())
      .notNull(),
    providerId: text("providerId")
      .notNull()
      .references(() => providers.userId),
    position: point("position").notNull(),
    address: text("address").notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
    userId: text("userId").references(() => users.id),
    isActive: boolean("isActive").notNull().default(true),
  },
);

export type Listing = typeof listings.$inferSelect;
