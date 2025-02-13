import { pgTable, varchar, text, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as drizzleZod from "drizzle-zod"
import { array, z } from "zod";
// import { sql } from "drizzle-orm";
// import { zodString } from "@/utils/zod-utils";


export const ALL_LANGUAGES = ["English", "French", "Spanish"] as const;
export const languagesEnum = pgEnum("languages", ALL_LANGUAGES);


export const providers = pgTable("providers", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id")
    .references(() => users.id),
  about: text("about"),
  credentials: text("credentials"),
  languages: languagesEnum("languages").array(),
  name: text("name"),
  email: text("email"),
  phoneNumber: varchar("phone_number", { length: 20 }),
  image: text("image"),

});

export const providerInsertSchema = createInsertSchema(providers);
export const providerSelectSchema = createSelectSchema(providers);
export const providerUpdateSchema = providerSelectSchema
  .partial()
  .required({ id: true });
