"use client";
import { Button } from "@/components/ui/button";
import { ALL_LANGUAGES } from "@/server/db/schema/tables/providers";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { trpc } from "@/server/client";

export default function LanguageSection({
  selectedLanguages,
}: {
  selectedLanguages: string[];
}) {
  const [languages, setLanguages] = useState<string[]>(selectedLanguages);

  useEffect(() => {
    setLanguages(selectedLanguages);
  }, [selectedLanguages]);

  const { mutate: updateProvider, isPending: isUpdating } =
    trpc.provider.updateProvider.useMutation();

  const toggleLanguage = (language: string) => {
    setLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language],
    );
  };

  const saveLanguages = () => {
    updateProvider({
      languages: languages as (typeof ALL_LANGUAGES)[number][],
    });
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Languages</h3>
      <div className="flex flex-wrap gap-2">
        {ALL_LANGUAGES.map((lang) => (
          <Badge
            key={lang}
            className={`cursor-pointer ${languages.includes(lang) ? "bg-pink-500" : "bg-zinc-800"}`}
            onClick={() => toggleLanguage(lang)}
          >
            {lang}
          </Badge>
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={saveLanguages}
          variant="outline"
          className="mt-2 text-white"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
