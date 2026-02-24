"use client";

import { useMemo } from "react";

import { episodes } from "@/data/episodes";

import { EpisodeCard } from "./EpisodeCard";
import { useDTSContext } from "@/context/DTSContext";

export function EpisodeGrid() {
  const { filterState } = useDTSContext();

  const filteredEpisodes = useMemo(() => {
    return episodes.filter((episode) => {
      const seasonMatch =
        filterState.season === "all" || episode.season === filterState.season;

      const driverMatch =
        filterState.drivers.length === 0 ||
        filterState.drivers.every((driver) => episode.drivers.includes(driver));

      const teamMatch =
        filterState.teams.length === 0 ||
        filterState.teams.every((team) => episode.teams.includes(team));

      if (!seasonMatch || !driverMatch || !teamMatch) {
        return false;
      }

      return true;
    });
  }, [filterState]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">Drive to Survive</h1>
        <p className="text-sm text-zinc-400">{filteredEpisodes.length} episodes</p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filteredEpisodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </section>
    </main>
  );
}
