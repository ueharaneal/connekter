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
import { providerProfiles } from "./providers";
export const listings = pgTable(
  "listings",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull().notNull(),
    imageUrls: varchar("image_urls").array().notNull(),
    address: text("address").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("update_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    providerId: text("provider_id")
      .references(() => providerProfiles.userId)
      .notNull(),
    isActive: boolean("is_active").notNull().default(true),
    about: text("about"),
    serviceCost: integer("service_cost").notNull().default(0),
    serviceItems: text("service_items").array(),
    itemsNotIncluded: text("items_not_included").array(),
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
