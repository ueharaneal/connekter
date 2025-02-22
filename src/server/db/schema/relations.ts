import { relations } from "drizzle-orm";
import { users } from "./tables/users";
import { sessions, accounts } from "./tables/auth";
import { providerProfiles } from "./tables/providers";
import { listings } from "./tables/listings";
import { listingFaqs } from "./tables/faqs";
import { adminTeam, adminTeamMembers } from "./tables/adminTeam";

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const adminTeamRelations = relations(adminTeam, ({ many }) => ({
  members: many(adminTeamMembers),
}));

export const adminTeamMembersRelations = relations(
  adminTeamMembers,
  ({ one }) => ({
    adminTeam: one(adminTeam, {
      fields: [adminTeamMembers.adminTeamId],
      references: [adminTeam.id],
    }),
  }),
);

export const providerProfilesRelations = relations(
  providerProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [providerProfiles.userId],
      references: [users.id],
    }),
  }),
);

export const providerListingsRelations = relations(listings, ({ one }) => ({
  provider: one(providerProfiles, {
    fields: [listings.providerId],
    references: [providerProfiles.userId],
  }),
}));

export const listingFaqsRelations = relations(listingFaqs, ({ one }) => ({
  listing: one(listings, {
    fields: [listingFaqs.listingId],
    references: [listings.id],
  }),
}));
