import {
  timestamp,
  pgTable,
  text,
  boolean,
  jsonb,
  pgEnum,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { listings } from "./listings";
import { z } from "zod";

export const ROOM_TYPE = ["single", "double", "suite"] as const;

export type RoomType = (typeof ROOM_TYPE)[number];

export const ROOM_SIZE = ["small", "medium", "large"] as const;

export type RoomSize = (typeof ROOM_SIZE)[number];

export const CARE_LEVELS = ["low", "medium", "heavy"] as const;

export type CareLevel = (typeof CARE_LEVELS)[number];

export const roomTypeEnum = pgEnum("roomType", ROOM_TYPE);
export const roomSizeEnum = pgEnum("roomSize", ROOM_SIZE);
export const careLevelEnum = pgEnum("careLevel", CARE_LEVELS);
export const careLevelZodEnum = z.enum(["low", "medium", "heavy"]);

export const rooms = pgTable(
  "room",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID())
      .notNull(),
    careLevelId: integer("careLevelId").references(() => careLevels.careLevelId),
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
  (t) => ({
    careLevelIdIdx: index("careLevelIdIdx").on(t.careLevelId),
  })
);

export const careLevels = pgTable("careLevels", {
  careLevelId: integer("careLevelId").primaryKey().generatedByDefaultAsIdentity(),
  levelName: careLevelEnum("levelName").notNull(),
  items: text("items").array(),
  price: integer("price").notNull().default(0),
});

export type Room = typeof rooms.$inferSelect;
