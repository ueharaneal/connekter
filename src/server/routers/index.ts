import { createTRPCRouter } from "../trpc";
import { usersRouter } from "./usersRouter";
import { providerRouter } from "./providerRouter";
import { listingsRouter } from "./listingsRouter";
import { messagesRouter } from "./messagesRouter";
export const appRouter = createTRPCRouter({
  users: usersRouter,
  provider: providerRouter,
  listings: listingsRouter,
  messages: messagesRouter,
});

export type AppRouter = typeof appRouter;
