import { baseProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import db from "@/server/db";

export const userRouter = createTRPCRouter({
  getUsers: baseProcedure.query(async () => {
    const allUsers = await db.query.users.findMany();

    return allUsers;
  }),
  addUser: baseProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async () => {
      return { name: "sir", race: "thing " };
    }),
});
