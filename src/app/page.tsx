import { DriverFilterBar } from "@/components/DriverFilterBar";
import { EpisodeGrid } from "@/components/EpisodeGrid";
import { FilterBar } from "@/components/FilterBar";
import { SeasonTabs } from "@/components/SeasonTabs";
import { TeamFilterBar } from "@/components/TeamFilterBar";
import { DTSProvider } from "@/context/DTSContext";

export default function HomePage() {
  return (
    <DTSProvider>
      <SeasonTabs />
      <FilterBar />
      <DriverFilterBar />
      <TeamFilterBar />
      <EpisodeGrid />
    </DTSProvider>
  );
}
