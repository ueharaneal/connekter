"use server";

import { z } from "zod";
import { UpdateUserInfoSchema } from "@/validators/updateUserInfoValidators";
import nextAuth from "@/auth";
export const updateUserInfo = async (values: unknown) => {
  const parsedValues = UpdateUserInfoSchema.safeParse(values);

  if (parsedValues.success) {
    const { id, name } = parsedValues.data;
    const session = await nextAuth.auth();
    return { success: true };
  } else if (parsedValues.error) {
    const flatErrors = parsedValues.error.errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));
    return { success: false, error: flatErrors, statusCode: 400 };
  }
};
