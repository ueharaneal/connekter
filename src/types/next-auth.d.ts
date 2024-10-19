import type { JWT as DefaultJWT } from "next-auth/jwt";
import { type User as DefaultUser } from "next-auth";

import { users } from "@/db/schema";

declare module "next-auth" {
  interface User extends DefaultUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: (typeof users.$inferInsert)["id"];
  }
}
