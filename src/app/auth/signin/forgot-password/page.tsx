import { findVerificationTokenByToken } from "@/lib/server-utils/auth/tokenQueries";
import { InvalidResetTokenState } from "./_components/InvalidResetTokenState";
import PasswordResetForm from "./_components/PasswordResetForm";

type PageProps = { searchParams: { token: string } };

export default async function Page({ searchParams }: PageProps) {
  const verificationToken = await findVerificationTokenByToken(
    searchParams.token,
  );
  if (!verificationToken?.expires) {
    return <InvalidResetTokenState state="invalid" />;
  }
  const isExpired = new Date(verificationToken.expires) < new Date();
  if (isExpired) {
    return <InvalidResetTokenState state="expired" />;
  }

  //const res = await

  return (
    <PasswordResetForm
      email={verificationToken.identifier}
      token={searchParams.token}
    />
  );
}
