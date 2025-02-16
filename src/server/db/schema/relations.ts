import { relations } from "drizzle-orm";
import { users } from "./tables/users";
import { sessions, accounts } from "./tables/auth";
import { providers } from "./tables/providers";
import { listings } from "./tables/listings";

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const providerProfilesRelations = relations(
  providers,
  ({ one }) => ({
    user: one(users, {
      fields: [providers.userId],
      references: [users.id],
    }),
  }),
);

export const providerListingsRelations = relations(
  listings,
  ({ one }) => ({
    provider: one(providers, {
      fields: [listings.providerId],
      references: [providers.userId],
    }),
  }),
);
