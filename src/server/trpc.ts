import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import { type Session } from "next-auth";
import nextAuth from "@/auth";
import superjson from "superjson";
import { ZodError } from "zod";

interface CreateContextOptions {
  session: Session | null;
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
  };
};

export const createTRPCContext = cache(async () => {
  // Get the session from the server using the getServerSession wrapper function
  const session = await nextAuth.auth();

  return createInnerTRPCContext({
    session,
  });
});

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

const t = initTRPC.context<typeof createTRPCContext>().create({
  //@see https://trpc.io/docs/server/data-transformers
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

//creating context for proceudre middleware

// Base router and procedure helpers
export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const { user, ...session } = ctx.session;

  return next({
    ctx: {
      // infers the `session` as non-nullable
      user,
      session,
    },
  });
});

export const createCallerFactory = t.createCallerFactory;
