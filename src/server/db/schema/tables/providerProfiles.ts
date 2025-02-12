import { pgTable, varchar, pgEnum, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const providerProfiles = pgTable("provider_profiles", {
  userId: varchar("user_id")
    .primaryKey()
    .references(() => users.id),
});
