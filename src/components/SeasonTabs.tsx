"use client";

import { cn } from "@/lib/utils";

import { useDTSContext } from "@/context/DTSContext";

const seasonOptions: Array<number | "all"> = ["all", 1, 2, 3, 4, 5, 6, 7, 8];

export function SeasonTabs() {
  const { filterState, setSeason } = useDTSContext();

  return (
    <section className="sticky top-0 z-30 border-b border-white/10 bg-black/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8">
        {seasonOptions.map((season) => {
          const isActive = filterState.season === season;
          const label = season === "all" ? "All" : `Season ${season}`;

          return (
            <button
              key={season}
              type="button"
              onClick={() => setSeason(season)}
              className={cn(
                "relative py-4 text-sm font-medium whitespace-nowrap transition-colors",
                isActive ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200",
              )}
            >
              {label}
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 transition-opacity",
                  isActive ? "bg-red-500 opacity-100" : "bg-transparent opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
