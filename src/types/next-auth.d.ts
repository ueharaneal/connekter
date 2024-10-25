import type { JWT as DefaultJWT } from "next-auth/jwt";
import { type User as DefaultUser } from "next-auth";

import { users } from "@/db/schema";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: (typeof users.$inferSelect)["role"];
    emailVerified: (typeof users.$inferInsert)["emailVerified"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: (typeof users.$inferInsert)["id"];
    role: (typeof users.$inferSelect)["role"];
  }
}
