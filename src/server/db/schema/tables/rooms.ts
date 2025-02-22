import {
  timestamp,
  pgTable,
  text,
  boolean,
  jsonb,
  pgEnum,
  integer,
  index,
  serial,
} from "drizzle-orm/pg-core";
import { listings } from "./listings";
import { z } from "zod";

export const ROOM_TYPE = ["single", "double", "suite"] as const;

export type RoomType = (typeof ROOM_TYPE)[number];

export const ROOM_SIZE = ["small", "medium", "large"] as const;

export type RoomSize = (typeof ROOM_SIZE)[number];

export const ROOM_PROPERTIES = [
  "private bathroom",
  "shared bathroom",
  "private room",
  "shared room",
] as const;

export type RoomProperties = (typeof ROOM_PROPERTIES)[number];

export const AVAILABLE_TO = ["Private Pay", "Medicaid"] as const;

export type AvailableTo = (typeof AVAILABLE_TO)[number];

export const CARE_LEVELS = ["low", "medium", "heavy"] as const;

export type CareLevel = (typeof CARE_LEVELS)[number];

export const roomTypeEnum = pgEnum("room_type", ROOM_TYPE);
export const roomSizeEnum = pgEnum("room_size", ROOM_SIZE);
export const careLevelEnum = pgEnum("care_level", CARE_LEVELS);
export const careLevelZodEnum = z.enum(["low", "medium", "heavy"]);
export const roomPropertiesEnum = pgEnum("room_properties", ROOM_PROPERTIES);
export const availableToEnum = pgEnum("available_to", AVAILABLE_TO);

export const rooms = pgTable("room", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  name: text("name").notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  listingId: integer("listing_id").references(() => listings.id),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  roomPhotos: jsonb("room_photos").notNull(),
  roomType: roomTypeEnum("room_type").notNull(),
  roomSize: roomSizeEnum("room_size").notNull(),
  roomPrice: integer("room_price").notNull(),
  roomDescription: text("room_description").notNull(),
  roomProperties: roomPropertiesEnum("room_properties")
    .array()
    .notNull()
    .default([]),
  availableTo: availableToEnum("available_to").notNull().default("Private Pay"),
});

export const careLevels = pgTable(
  "care_levels",
  {
    id: serial("id").primaryKey().notNull(),
    roomId: text("room_id")
      .notNull()
      .references(() => rooms.id, { onDelete: "cascade" }), // Each careLevel belongs to a room
    levelName: careLevelEnum("level_name").notNull(), // low, medium, or heavy
    price: integer("price").notNull().default(0),
  },
  (t) => ({
    roomIdIdx: index("room_id_idx").on(t.roomId), // Index for faster queries
  }),
);

export type Room = typeof rooms.$inferSelect;
export type CareLevelT = typeof careLevels.$inferSelect;
