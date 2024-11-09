import { pgTable, varchar, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";
import { ALL_JOB_TITLES } from "../common";

export const jobTitleEnum = pgEnum("job_title", ALL_JOB_TITLES); // we can save this for later

export const providerAccount = pgTable("provider_profiles", {
  userId: varchar("user_id")
    .primaryKey()
    .references(() => users.id),
  jobTitles: jobTitleEnum().array(),
});
