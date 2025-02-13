import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import db from "@/server/db";

export const usersRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async () => {
    const allUsers = await db.query.users.findMany();

    return allUsers;
  }),
  addUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async () => {
      return { name: "sir", race: "thing " };
    }),
});
