import {
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { listings } from "./listings";

export const listingFaqs = pgTable(
  "listing_faqs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID())
      .notNull(),
    listingId: text("listing_id")
      .references(() => listings.id)
      .notNull(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  }
);

export type ListingFaq = typeof listingFaqs.$inferSelect;
