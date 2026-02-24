"use client";

import { useMemo } from "react";

import { episodes } from "@/data/episodes";
import { matchesDriverTeamFilters, useDTSContext } from "@/context/DTSContext";
import type { Episode } from "@/types";

import { EpisodeCard } from "./EpisodeCard";

type EpisodeGridProps = {
  setSelectedEpisode: (episode: Episode | null) => void;
};

export function EpisodeGrid({ setSelectedEpisode }: EpisodeGridProps) {
  const { filterState, watchedEpisodes } = useDTSContext();

  const filteredEpisodes = useMemo(() => {
    if (filterState.topRated) {
      return [...episodes].sort(
        (leftEpisode, rightEpisode) => rightEpisode.imdbRating - leftEpisode.imdbRating,
      );
    }

    const query = filterState.searchQuery.trim().toLowerCase();

    const nextEpisodes = episodes.filter((episode) => {
      const seasonMatch =
        filterState.season === "all" || episode.season === filterState.season;
      const participantMatch = matchesDriverTeamFilters(
        episode.drivers,
        episode.teams,
        filterState,
      );

      const searchMatch = query.length === 0 || episode.title.toLowerCase().includes(query);
      const watchedMatch = !filterState.watchedOnly || watchedEpisodes.includes(episode.id);

      return seasonMatch && participantMatch && searchMatch && watchedMatch;
    });

    if (!filterState.sortByRating) {
      return nextEpisodes;
    }

    return [...nextEpisodes].sort(
      (leftEpisode, rightEpisode) => rightEpisode.imdbRating - leftEpisode.imdbRating,
    );
  }, [filterState, watchedEpisodes]);

  const filteredCount = filteredEpisodes.length;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">Drive to Survive</h1>
        <p className="text-sm text-zinc-400">{filteredCount} episodes</p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filteredEpisodes.length === 0 ? (
          <div className="col-span-full py-16 text-center text-sm text-zinc-400">
            No episodes found. Try adjusting your filters.
          </div>
        ) : (
          filteredEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              onClick={() => setSelectedEpisode(episode)}
            />
          ))
        )}
      </section>
    </main>
  );
}
