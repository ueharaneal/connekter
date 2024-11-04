import { createTRPCRouter } from "../trpc";
import { usersRouter } from "./usersRouter";

export const appRouter = createTRPCRouter({
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
