"use client";

import { cn } from "@/lib/utils";
import { episodes } from "@/data/episodes";

import { useDTSContext } from "@/context/DTSContext";

const seasonOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
const episodeCountBySeason = seasonOptions.reduce<Record<number, number>>((accumulator, season) => {
  accumulator[season] = episodes.filter((episode) => episode.season === season).length;
  return accumulator;
}, {});

export function SeasonTabs() {
  const { filterState, setSeason, toggleTopRated } = useDTSContext();

  return (
    <section className="sticky top-0 z-30 border-b border-white/10 bg-black/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setSeason("all")}
          className={cn(
            "relative py-4 text-sm font-medium whitespace-nowrap transition-colors",
            !filterState.topRated && filterState.season === "all"
              ? "text-zinc-100"
              : "text-zinc-400 hover:text-zinc-200",
          )}
        >
          All
          <span
            className={cn(
              "absolute inset-x-0 bottom-0 h-0.5 transition-opacity",
              !filterState.topRated && filterState.season === "all"
                ? "bg-red-500 opacity-100"
                : "bg-transparent opacity-0",
            )}
          />
        </button>

        <button
          type="button"
          onClick={() => {
            if (!filterState.topRated) {
              toggleTopRated();
            }
          }}
          className={cn(
            "relative flex items-center gap-1 py-4 text-sm font-medium whitespace-nowrap transition-colors",
            filterState.topRated ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200",
          )}
        >
          <span>Top Rated</span>
          {filterState.topRated ? <span className="text-amber-400">⭐</span> : null}
          <span
            className={cn(
              "absolute inset-x-0 bottom-0 h-0.5 transition-opacity",
              filterState.topRated ? "bg-red-500 opacity-100" : "bg-transparent opacity-0",
            )}
          />
        </button>

        {seasonOptions.map((season) => {
          const isActive = !filterState.topRated && filterState.season === season;
          const label = `Season ${season}`;

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
              <span className="ml-1 text-xs text-zinc-500">({episodeCountBySeason[season]})</span>
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
