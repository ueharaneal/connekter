import {
  timestamp,
  pgTable,
  text,
  boolean,
  geometry,
  index,
  varchar,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users";
export const listings = pgTable(
  "listings",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull().notNull(),
    imageUrls: varchar("image_urls").array().notNull(),
    address: text("address").notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    userId: text("userId")
      .references(() => users.id)
      .notNull(),
    isActive: boolean("isActive").notNull().default(true),
    serviceCost: integer("serviceCost").notNull().default(0),
    serviceItems: text("serviceItems").array(),
    itemsNotIncluded: text("itemsNotIncluded").array(),
    lowCareLevelItems: text("lowCareLevelItems").array(),
    mediumCareLevelItems: text("mediumCareLevelItems").array(),
    heavyCareLevelItems: text("heavyCareLevelItems").array(),
    latLngPoint: geometry("lat_lng_point", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }).notNull(),
  },
  (t) => [index("spatial_index").using("gist", t.latLngPoint)],
);

export type Listing = typeof listings.$inferSelect;
