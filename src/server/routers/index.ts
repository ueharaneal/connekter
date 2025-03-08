import { createTRPCRouter } from "../trpc";
import { usersRouter } from "./usersRouter";
import { providerRouter } from "./providerRouter";
import { listingsRouter } from "./listingsRouter";
import { messagesRouter } from "./messagesRouter";
import { faqRouter } from "./faqRouter";
import { stripeRouter } from "./stripeRouter";
import { utilsRouter } from "./utilsRouter";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  provider: providerRouter,
  listings: listingsRouter,
  messages: messagesRouter,
  faq: faqRouter,
  stripe: stripeRouter,
  utils: utilsRouter,
});

export type AppRouter = typeof appRouter;
