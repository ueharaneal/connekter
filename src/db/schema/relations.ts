import { relations } from "drizzle-orm";
import { users } from "./tables/users";
import { sessions, accounts } from "./tables/auth";

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));
