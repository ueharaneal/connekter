import React from "react";
import nextAuth from "@/../auth";
import { type User } from "next-auth";
import Image from "next/image";
import SignoutButton from "@/components/common/SignoutButton";

export default async function ProfilePage() {
  const session = await nextAuth.auth();
  console.log(session);

  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl tracking-tight">Profile Page</h1>

        {session?.user ? <SignedIn user={session.user} /> : <SignedOut />}
      </div>
    </main>
  );
}

const SignedIn = ({ user }: { user: User }) => {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">User Information</h2>
      <table className="my-6 table-auto divide-y">
        <thead>
          <tr className="divide-x">
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="mt-2 divide-x">
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {user.image && (
                <Image
                  src={user.image}
                  alt={`user image`}
                  width={100}
                  height={100}
                  className="h-10 w-10 rounded-full"
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <SignoutButton />
    </>
  );
};

const SignedOut = () => {
  return (
    <>
      {" "}
      <h2 className="text-2x font-bold tracking-tight"> User not signed in </h2>
    </>
  );
};
