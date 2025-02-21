import { relations } from "drizzle-orm";
import { users } from "./tables/users";
import { sessions, accounts } from "./tables/auth";
import { providers } from "./tables/providers";
import { listings } from "./tables/listings";
import { listingFaqs } from "./tables/faqs";

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const providerProfilesRelations = relations(providers, ({ one }) => ({
  user: one(users, {
    fields: [providers.userId],
    references: [users.id],
  }),
}));

export const providerListingsRelations = relations(listings, ({ one }) => ({
  provider: one(providers, {
    fields: [listings.userId],
    references: [providers.userId],
  }),
}));

export const listingFaqsRelations = relations(listingFaqs, ({ one }) => ({
  listing: one(listings, {
    fields: [listingFaqs.listingId],
    references: [listings.id],
  }),
}));
