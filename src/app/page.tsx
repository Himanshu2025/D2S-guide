import { EpisodeGrid } from "@/components/EpisodeGrid";
import { DTSProvider } from "@/context/DTSContext";

export default function HomePage() {
  return (
    <DTSProvider>
      <EpisodeGrid />
    </DTSProvider>
  );
}
