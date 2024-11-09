import { relations } from "drizzle-orm";
import { users } from "./tables/users";
import { sessions, accounts } from "./tables/auth";
import { providerProfiles } from "./tables/providerProfiles";

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const providerProfilesRelations = relations(
  providerProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [providerProfiles.userId],
      references: [users.id],
    }),
  }),
);
