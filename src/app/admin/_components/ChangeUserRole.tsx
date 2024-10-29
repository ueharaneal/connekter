"use client";
import { changeUserRoleAction } from "@/actions/auth/change-user-role-action";
import { users } from "@/db/schema";
import React, { useTransition } from "react";

type ChangeUserRoleInputProps = {
  email: string;
  currentRole: (typeof users.$inferSelect)["role"];
  isAdmin: boolean;
};

function ChangeUserRole({
  email,
  currentRole,
  isAdmin,
}: ChangeUserRoleInputProps) {
  const [isPending, startTransition] = useTransition();

  function changeHandler(
    email: string,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    console.log();
    const newRole = event.target.value as (typeof users.$inferSelect)["role"];
    if (newRole === currentRole) return;
    startTransition(async () => {
      await changeUserRoleAction({ email, newRole });
    });
  }
  return (
    <select
      disabled={isPending || isAdmin}
      defaultValue={currentRole}
      onChange={changeHandler.bind(null, email)}
      className="rounded-border w-full border-gray-200 bg-white px-2 py-1 focus:border-gray-500"
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  );
}

export default ChangeUserRole;
