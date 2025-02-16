import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="mb-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Carefinder</h1>
      <Button
        variant="outline"
        className="border-white/20 bg-transparent text-white hover:bg-white/10"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add AFH
      </Button>
    </header>
  );
}
