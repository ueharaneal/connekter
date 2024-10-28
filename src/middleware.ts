import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
//im too lazy to move auth.config logic to this file
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
