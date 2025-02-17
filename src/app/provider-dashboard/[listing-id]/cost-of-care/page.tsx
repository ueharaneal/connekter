"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CostCalculatorPage from "./_components/CostOfCare";
import CareLevelsPage from "./_components/CareLevelsPage";

export default function CostOfCarePage() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => setCurrentPage((prev) => (prev === 1 ? 0 : 1));
  const prevPage = () => setCurrentPage((prev) => (prev === 0 ? 1 : 0));

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl bg-zinc-900 text-white">
        <CardContent className="relative space-y-6 px-12">
          {/* Navigation Arrows */}
          {currentPage === 1 && (
            <>
              <button
                onClick={prevPage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </>
          )}
          {currentPage === 0 && (
            <button
              onClick={nextPage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          <div className="pb-4">
            {currentPage === 0 ? <CostCalculatorPage /> : <CareLevelsPage />}
          </div>
          {/* Page Dots */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 pt-4">
            {[0, 1].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-2 w-2 rounded-full ${currentPage === page ? "bg-pink-500" : "bg-zinc-600"}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
