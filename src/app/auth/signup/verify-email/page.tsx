import { findVerificationTokenByToken } from "@/lib/server-utils/auth/tokenQueries";
import TokenIsInvalidState from "./_components/TokenIsInvalidState";
import React from "react";
import EmailVerifiedSuccess from "./_components/EmailVerifiedSuccess";
import { verifyCredentialsEmailAction } from "@/actions/auth/verify-credentials-email-action";

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

  //verify the user
  const res = await verifyCredentialsEmailAction(verificationToken.token);

  return res.success ? (
    <EmailVerifiedSuccess />
  ) : (
    <TokenIsInvalidState state="invalid" />
  );
}

export default Page;
