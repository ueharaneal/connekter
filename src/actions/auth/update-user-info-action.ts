"use server";

import { z } from "zod";
import { UpdateUserInfoSchema } from "@/validators/updateUserInfoValidators";
import nextAuth from "@/auth";
import { User } from "../../db/schema";

type Res =
  | { success: true; data: { id: User["id"]; name: User["name"] } }
  | {
      success: false;
      error: z.inferFlattenedErrors<typeof UpdateUserInfoSchema>["fieldErrors"];
      statusCode: 400;
    }
  | {
      success: false;
      error: z.inferFlattenedErrors<typeof UpdateUserInfoSchema>["fieldErrors"];
      statusCode: 401;
    };

export const updateUserInfo = async (values: unknown) => {
  const parsedValues = UpdateUserInfoSchema.safeParse(values);

  if (parsedValues.success) {
    const { id, name } = parsedValues.data;
    const session = await nextAuth.auth();

    if (!session?.user?.id || session.user.id !== id) {
      return { success: false, error: "Unauthorized", statusCode: 401 };
    }

    if (session.user.name === name) {
      return { success: true, data: { id, name } };
    }
    return { success: true };
  } else if (parsedValues.error) {
    const flatErrors = parsedValues.error.errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));
    return { success: false, error: flatErrors, statusCode: 400 };
  }

  try {
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
};
