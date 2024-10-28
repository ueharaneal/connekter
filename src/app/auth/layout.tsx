import nextAuth from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await nextAuth.auth();
  if (session) {
    redirect("/profile");
  }
  return <>{children}</>;
}
