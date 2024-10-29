//this file is because crypt can not run correctly on the middleware
//originall this was in the auth.ts file but moved here with a new authConfig
//this file has everything except for the credential providers.
import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/db";
import * as schema from "@/db/schema";
import { oathVerifyEmailAction } from "./actions/auth/oauth-verify-email-actions";
import Google from "next-auth/providers/google";

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    accountsTable: schema.accounts,
    usersTable: schema.users,
    sessionsTable: schema.sessions,
    authenticatorsTable: schema.authenticators,
    verificationTokensTable: schema.verificationTokens,
  }), //adds the user to db when using external provider
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request }) {
      //to protect pages and routes from unauthorized users
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      const isOnAuth = nextUrl.pathname.startsWith("/auth");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isOnProfile) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("auth/signin", nextUrl));
      }
      if (isOnAuth) {
        if (!isLoggedIn) return;
        return Response.redirect(new URL("/", nextUrl));
      }
      if (isOnAdmin) {
        if (isLoggedIn && auth?.user?.role === "admin") return true;
        console.log("test", auth?.user);
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      //first login is the only chance to attach to token because that the only time we will get the user object back
      console.log("user", user);
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id!;
      session.user.role = token.role!;

      return session;
    },
    signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        return !!profile?.email_verified;
      }
      if (account?.provider === "credentials") {
        if (user?.emailVerified) {
          //return true;
        }
        return true;
      }
      return false;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (["google", "github"].includes(account.provider)) {
        //verify the user's email
        if (user?.email) await oathVerifyEmailAction(user?.email);
      }
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
