import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { EditProfileSheet } from "./EditProfileSheet";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileHeaderProps {
  name: string;
}

export default function ProfileHeader({ name }: ProfileHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-start justify-between space-y-0">
      <div>
        <CardTitle className="text-2xl font-bold">
          Meet the Care Provider
        </CardTitle>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg">{name}</span>
          <Badge variant="secondary" className="bg-zinc-800">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Verified Provider
          </Badge>
        </div>
      </div>
      <EditProfileSheet />
    </CardHeader>
  );
}
