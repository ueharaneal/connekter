import NextAuth from "next-auth";
import { env } from "@/env";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { SignInSchema } from "@/validators/auth-validators";
import { findUserByEmail } from "@/lib/server-utils/userQueries";

const nextAuth = NextAuth({
  session: { strategy: "jwt" },
  secret: env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = SignInSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          //Carry on with sign in
          const { email, password } = parsedCredentials.data;
          const user = await findUserByEmail(email);
          if (!user) return null;
          if (!user.password) return null; //becuase other credetionals
        }
        return null;
      },
    }),
  ],
});
