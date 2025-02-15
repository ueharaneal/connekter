import {
  timestamp,
  pgTable,
  text,
  boolean,
  geometry,
  index,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const listings = pgTable(
  "listings",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID())
      .notNull(),
    name: text("name").notNull(),
    imageUrls: varchar("image_urls").array().notNull(),
    address: text("address").notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    userId: text("userId").references(() => users.id),
    isActive: boolean("isActive").notNull().default(true),
    latLngPoint: geometry("lat_lng_point", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }).notNull(),
  },
  (t) => [index("spatial_index").using("gist", t.latLngPoint)],
);

export type Listing = typeof listings.$inferSelect;
