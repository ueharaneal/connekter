import { createTRPCRouter } from "../trpc";
import { userRouter } from "./users";

export const appRouter = createTRPCRouter({
  users: userRouter,
});

export type AppRouter = typeof appRouter;
