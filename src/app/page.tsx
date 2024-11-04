import React from "react";
import { trpc } from "@/server/trpcServer";

function HomePage() {
  void trpc.users.getUsers.prefetch();
  console.log(allUsers);
  return (
    <div>
      {allUsers ? (
        <div>
          {allUsers.map((user) => (
            <div key={user.id}>{user.email}</div>
          ))}
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}

export default HomePage;
