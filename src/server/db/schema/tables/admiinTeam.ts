// import {
//   pgTable,
//   integer,
//   serial,
//   text,
//   timestamp,
//   pgEnum,
// } from "drizzle-orm/pg-core";
// import { users } from "./users";

// export const adminTeam = pgTable("admin_team", {
//   id: serial("id").primaryKey().notNull(),
// });

// export const adminTeamMembers = pgTable("admin_team_memeber", {
//   adminTeamId: integer("admin_team_id")
//     .notNull()
//     .references(() => adminTeam.id, { onDelete: "cascade" }),
//   userId: text("user_id")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   addedAt: timestamp("added_at", { withTimezone: true }).notNull().defaultNow(),
// });
