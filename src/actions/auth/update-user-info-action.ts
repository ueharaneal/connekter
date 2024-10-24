"use server";

import { z } from "zod";
import { UpdateUserInfoSchema } from "@/validators/updateUserInfoValidators";
import nextAuth from "@/auth";
import { User, users } from "../../db/schema";
import db from "@/db";
import { eq } from "drizzle-orm";
type ErrorItem = {
  field: string;
  message: string;
};

type Res =
  | { success: true; data: { id: User["id"]; name: User["name"] | null } }
  | {
      success: false;
      error: ErrorItem[];
      statusCode: 400;
    }
  | {
      success: false;
      error: string;
      statusCode: 401 | 500;
    };

export const updateUserInfo = async (values: unknown): Promise<Res> => {
  const parsedValues = UpdateUserInfoSchema.safeParse(values);

  if (parsedValues.success) {
    const { id, name } = parsedValues.data;
    const session = await nextAuth.auth();

    if (!session?.user?.id || session.user.id !== id) {
      return { success: false, error: "Unauthorized", statusCode: 401 };
    }

    if (session.user.name !== session.user.name) {
      return { success: false, error: "Unauthorized", statusCode: 401 };
    }

    try {
      const updatedUser = await db
        .update(users)
        .set({
          name,
        })
        .where(eq(users.id, id))
        .returning({ id: users.id, name: users.name })
        .then((res) => res[0]);

      return { success: true, data: updatedUser };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: "Internal Server Error",
        statusCode: 500,
      };
    }
  } else {
    const flatErrors = parsedValues.error.errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));
    return { success: false, error: flatErrors, statusCode: 400 };
  }
};
