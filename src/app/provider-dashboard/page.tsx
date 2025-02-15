import Header from "./_components/Header";
import ProviderCard from "./_components/ProviderCard";
import NavigationMenu from "./_components/NavigationMenu";
import { Suspense } from "react";
export default function Page() {

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      {/* Header */}
      <Header />

      {/* Main Card */}
      <Suspense fallback={<div>Loading...</div>}>
        <ProviderCard />
      </Suspense>

      {/* Navigation Menu */}
      <NavigationMenu />
    </div>
  );
}
