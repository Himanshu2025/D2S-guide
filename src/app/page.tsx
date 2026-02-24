"use client";

import { DriverFilterBar } from "@/components/DriverFilterBar";
import { EpisodeDetail } from "@/components/EpisodeDetail";
import { EpisodeGrid } from "@/components/EpisodeGrid";
import { FilterBar } from "@/components/FilterBar";
import { SeasonTabs } from "@/components/SeasonTabs";
import { TeamFilterBar } from "@/components/TeamFilterBar";
import { DTSProvider, useDTSContext } from "@/context/DTSContext";

function WatchedProgressBar() {
  const { watchedEpisodes } = useDTSContext();

  const watchedCount = watchedEpisodes.length;
  const totalEpisodes = 100;
  const progress = Math.min((watchedCount / totalEpisodes) * 100, 100);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mb-2 text-sm text-zinc-300">{watchedCount} / 100 episodes watched</div>
      <progress
        value={progress}
        max={100}
        className="h-1.5 w-full overflow-hidden rounded [&::-webkit-progress-bar]:bg-zinc-800 [&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-red-500"
      />
    </section>
  );
}

export function HomePageContent() {
  const { setSelectedEpisode } = useDTSContext();

  return (
    <>
      <SeasonTabs />
      <FilterBar />
      <DriverFilterBar />
      <TeamFilterBar />
      <WatchedProgressBar />
      <EpisodeGrid setSelectedEpisode={setSelectedEpisode} />
      <EpisodeDetail />
    </>
  );
}

export default function HomePage() {
  return (
    <DTSProvider>
      <HomePageContent />
    </DTSProvider>
  );
}
