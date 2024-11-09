import { pgTable, varchar, pgEnum, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { ALL_JOB_TITLES } from "../common";

export const jobTitleEnum = pgEnum("job_title", ALL_JOB_TITLES); // we can save this for later

export const providerProfiles = pgTable("provider_profiles", {
  userId: varchar("user_id")
    .primaryKey()
    .references(() => users.id),
  jobTitles: jobTitleEnum().array().notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  coverPhotoUrl: varchar("cover_photo_url")
    .default(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnz37-0_7w_oCLpjaCiIdg3-8lJ4cE248U9A&s",
    )
    .notNull(),
});
