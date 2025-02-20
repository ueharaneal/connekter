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

export const ROOM_PROPERTIES = ["private bathroom", "shared bathroom", "private room", "shared room"] as const;

export type RoomProperties = (typeof ROOM_PROPERTIES)[number];

export const AVAILABLE_TO = ["Private Pay", "Medicaid"] as const;

export type AvailableTo = (typeof AVAILABLE_TO)[number];

export const CARE_LEVELS = ["low", "medium", "heavy"] as const;

export type CareLevel = (typeof CARE_LEVELS)[number];

export const roomTypeEnum = pgEnum("roomType", ROOM_TYPE);
export const roomSizeEnum = pgEnum("roomSize", ROOM_SIZE);
export const careLevelEnum = pgEnum("careLevel", CARE_LEVELS);
export const careLevelZodEnum = z.enum(["low", "medium", "heavy"]);
export const roomPropertiesEnum = pgEnum("roomProperties", ROOM_PROPERTIES);
export const availableToEnum = pgEnum("availableTo", AVAILABLE_TO);
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
    roomProperties: roomPropertiesEnum("roomProperties").array().notNull().default([]),
    availableTo: availableToEnum("availableTo").notNull().default("Private Pay"),
  },
);

export const careLevels = pgTable("careLevels", {
  id: serial("id").primaryKey().notNull(),
  roomId: text("roomId")
    .notNull()
    .references(() => rooms.id, { onDelete: "cascade" }), // Each careLevel belongs to a room
  levelName: careLevelEnum("levelName").notNull(), // low, medium, or heavy
  items: text("items").array(),
  price: integer("price").notNull().default(0),
},
(t) => ({
  roomIdIdx: index("roomIdIdx").on(t.roomId), // Index for faster queries
}));

export type Room = typeof rooms.$inferSelect;
export type CareLevelT = typeof careLevels.$inferSelect;