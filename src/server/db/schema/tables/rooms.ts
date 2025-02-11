import {
  timestamp,
  pgTable,
  text,
  boolean,
  jsonb,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { listings } from "./listings";

export const ROOM_TYPE = ["single", "double", "suite"] as const;

export type RoomType = (typeof ROOM_TYPE)[number];

export const ROOM_SIZE = ["small", "medium", "large"] as const;

export type RoomSize = (typeof ROOM_SIZE)[number];

export const roomTypeEnum = pgEnum("roomType", ROOM_TYPE);
export const roomSizeEnum = pgEnum("roomSize", ROOM_SIZE);

export const rooms = pgTable(
  "room",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID())
      .notNull(),
    name: text("name").notNull(),
    isAvailable: boolean("isAvailable").notNull().default(true),
    listingId: text("listingId").references(() => listings.id),
    createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
    roomPhotos: jsonb("roomPhotos").notNull(),
    roomType: roomTypeEnum("roomType").notNull(),
    roomSize: roomSizeEnum("roomSize").notNull(),
    roomPrice: integer("roomPrice").notNull(),
    roomDescription: text("roomDescription").notNull(),
  },
);

export type Room = typeof rooms.$inferSelect;
