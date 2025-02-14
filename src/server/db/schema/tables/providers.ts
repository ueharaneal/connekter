import { pgTable, varchar, text, pgEnum, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const ALL_LANGUAGES = ["English", "French", "Spanish"] as const;
export const languagesEnum = pgEnum("languages", ALL_LANGUAGES);


export const providers = pgTable("providers", {
  userId: varchar("user_id")
    .primaryKey()
    .references(() => users.id),
  about: text("about"),
  credentials: text("credentials"),
  languages: languagesEnum("languages").array(),
  name: text("name"),
  email: text("email"),
  phoneNumber: varchar("phone_number", { length: 20 }),
  image: text("image"),
  verified: boolean("verified").default(false),
});
export type Provider = typeof providers.$inferSelect;
export const providerInsertSchema = createInsertSchema(providers);
export const providerSelectSchema = createSelectSchema(providers);
export const providerUpdateSchema = providerSelectSchema
  .partial()
  .required({ userId: true });
