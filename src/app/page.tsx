import { EpisodeGrid } from "@/components/EpisodeGrid";
import { FilterBar } from "@/components/FilterBar";
import { SeasonTabs } from "@/components/SeasonTabs";
import { DTSProvider } from "@/context/DTSContext";

export default function HomePage() {
  return (
    <DTSProvider>
      <SeasonTabs />
      <FilterBar />
      <EpisodeGrid />
    </DTSProvider>
  );
}
