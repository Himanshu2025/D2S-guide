"use client";

import { DriverFilterBar } from "@/components/DriverFilterBar";
import { EpisodeDetail } from "@/components/EpisodeDetail";
import { EpisodeGrid } from "@/components/EpisodeGrid";
import { FilterBar } from "@/components/FilterBar";
import { SeasonTabs } from "@/components/SeasonTabs";
import { TeamFilterBar } from "@/components/TeamFilterBar";
import { DTSProvider, useDTSContext } from "@/context/DTSContext";

export function HomePageContent() {
  const { setSelectedEpisode } = useDTSContext();

  return (
    <>
      <SeasonTabs />
      <FilterBar />
      <DriverFilterBar />
      <TeamFilterBar />
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
