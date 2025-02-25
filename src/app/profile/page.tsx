import nextAuth from "@/auth";
import type { User } from "next-auth";
import SignoutButton from "@/components/common/SignoutButton";
import UpdateUserInfo from "./_components/UpdateUserInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Calendar, UserCircle2 } from "lucide-react";

export default async function ProfilePage() {
  const session = await nextAuth.auth();

  return (
    <main className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">My Profile</h1>
      {session?.user ? <SignedIn user={session.user} /> : <SignedOut />}
    </main>
  );
}

const SignedIn = ({ user }: { user: User }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <p className="text-muted-foreground">{user.email}</p>
            <Badge variant="outline" className="mt-2">
              User ID: {user.id}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 opacity-70" /> {user.email}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 opacity-70" /> Location (Not
              provided)
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 opacity-70" /> Joined: (Not
              provided)
            </div>
            <div className="flex items-center">
              <UserCircle2 className="mr-2 h-4 w-4 opacity-70" /> Role: (Not
              provided)
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateUserInfo user={user} />
        </CardContent>
      </Card>

      <Separator />

      <div className="flex items-center justify-between">
        <Button variant="outline">Change Password</Button>
        <SignoutButton />
      </div>
    </div>
  );
};

const SignedOut = () => {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">User Not Signed In</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="mb-4">Please sign in to view your profile.</p>
        <Button>Sign In</Button>
      </CardContent>
    </Card>
  );
};
