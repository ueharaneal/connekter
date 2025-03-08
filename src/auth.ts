export const runtime = "nodejs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { SignInSchema } from "@/validators/auth-validators";
import { findUserByEmail } from "@/lib/server-utils/userQueries";
import bcrypt from "bcryptjs";
import { OAuthAccountAlreadyLinkedError } from "./lib/auth/customErrors";
import { authConfig } from "@/auth.config";

const { providers: authConfigProviders, ...authConfigRest } = authConfig;

const nextAuth = NextAuth({
  ...authConfigRest,
  providers: [
    ...authConfigProviders,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = SignInSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          //Carry on with sign in
          const { email, password } = parsedCredentials.data;
          const user = await findUserByEmail(email);
          if (!user) return null;
          if (!user.password) throw new OAuthAccountAlreadyLinkedError();

          // Using bcrypt.compare instead of argon2.verify
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            //remove password from user object
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }
        return null;
      },
    }),
  ],
});

export default nextAuth;
