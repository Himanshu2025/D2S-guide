"use client";

import { cn } from "@/lib/utils";

import { useDTSContext } from "@/context/DTSContext";

export function FilterBar() {
  const { filterState, setSearchQuery, toggleSortByRating, toggleWatched } = useDTSContext();

  return (
    <section className="sticky top-14 z-20 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <input
          value={filterState.searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          type="text"
          placeholder="Search episodes by title"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 lg:max-w-sm"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={toggleSortByRating}
            className={cn(
              "rounded-md border px-3 py-2 text-sm font-medium transition-colors",
              filterState.sortByRating
                ? "border-red-500 bg-red-500/15 text-red-300"
                : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-600",
            )}
          >
            Sort by IMDb Rating
          </button>

          <button
            type="button"
            onClick={toggleWatched}
            className={cn(
              "rounded-md border px-3 py-2 text-sm font-medium transition-colors",
              filterState.watchedOnly
                ? "border-red-500 bg-red-500/15 text-red-300"
                : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-600",
            )}
          >
            Watched Only
          </button>
        </div>
      </div>
    </section>
  );
}
