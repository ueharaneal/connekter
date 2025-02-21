"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { AllProviders } from "./AllProviders";
import { AllListings } from "./AllListings";

export default function AdminProviderPage() {
  return (
    <div className="container p-6">
      <h1 className="mb-6 text-3xl font-bold">Provider Management</h1>

      <Tabs defaultValue="providers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="providers">All Providers</TabsTrigger>
          <TabsTrigger value="listings">All Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          <Suspense fallback={<div>Loading providers...</div>}>
            <AllProviders />
          </Suspense>
        </TabsContent>

        <TabsContent value="listings" className="space-y-4">
          <Suspense fallback={<div>Loading listings...</div>}>
            <AllListings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
