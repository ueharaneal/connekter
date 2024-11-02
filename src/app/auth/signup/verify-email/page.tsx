import { findVerificationTokenByToken } from "@/lib/server-utils/auth/tokenQueries";
import TokenIsInvalidState from "./_components/TokenIsInvalidState";
import React from "react";
import EmailVerifiedSuccess from "./_components/EmailVerifiedSuccess";

type PageProps = { searchParams: { token: string } };
async function Page({ searchParams }: PageProps) {
  if (!searchParams.token) return <TokenIsInvalidState state="invalid" />;

  const verificationToken = await findVerificationTokenByToken(
    searchParams.token,
  );

  if (!verificationToken?.expires)
    return <TokenIsInvalidState state="invalid" />;
  const isExpired = new Date(verificationToken.expires) < new Date();

  if (isExpired) return <TokenIsInvalidState state="expired" />;

  return <EmailVerifiedSuccess />;
}

export default Page;
