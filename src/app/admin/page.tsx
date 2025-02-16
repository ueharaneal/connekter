import nextAuth from "@/auth";
import { redirect } from "next/navigation";
import Overview from "./_components/overview/Overview";

export default async function Page() {
  const session = await nextAuth.auth();

  if (session?.user?.role !== "admin") redirect("/profile");

  return (
    <div>
      <Overview />
    </div>
  );
}
