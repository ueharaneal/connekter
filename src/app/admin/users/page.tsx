import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllUsers } from "./_components/AllUsers";
import { AllContracters } from "./_components/AllContracters";
import { AllNurses } from "./_components/AllNurses";

export default function UsersPage() {
  return (
    <div className="container p-6">
      <h1 className="mb-6 text-3xl font-bold">User Management</h1>

      <Tabs defaultValue="all-users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="nurses">Nurses</TabsTrigger>
        </TabsList>

        <TabsContent value="all-users" className="space-y-4">
          <AllUsers />
        </TabsContent>

        <TabsContent value="providers" className="space-y-4">
          <AllContracters />
        </TabsContent>

        <TabsContent value="nurses" className="space-y-4">
          <AllNurses />
        </TabsContent>
      </Tabs>
    </div>
  );
}
