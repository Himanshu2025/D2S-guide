"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";

import { drivers } from "@/data/drivers";
import { teams } from "@/data/teams";
import { cn } from "@/lib/utils";

import { useDTSContext } from "@/context/DTSContext";

const driverNameBySlug = new Map(drivers.map((driver) => [driver.slug, driver.name]));
const teamNameBySlug = new Map(teams.map((team) => [team.slug, team.name]));

function formatSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function EpisodeDetail() {
  const { selectedEpisode, setSelectedEpisode, toggleWatched, filterState } = useDTSContext();

  return (
    <AnimatePresence>
      {selectedEpisode && (
        <>
          <motion.button
            type="button"
            aria-label="Close episode detail"
            className="fixed inset-0 z-40 bg-black/60"
            onClick={() => setSelectedEpisode(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-zinc-950 p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex rounded bg-zinc-800 px-2 py-1 text-xs font-semibold tracking-wide text-zinc-100">
                  S{String(selectedEpisode.season).padStart(2, "0")} · E
                  {String(selectedEpisode.episode).padStart(2, "0")}
                </span>
                <h2 className="text-2xl font-semibold text-zinc-100">{selectedEpisode.title}</h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEpisode(null)}
                className="rounded border border-zinc-700 p-2 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
                aria-label="Close panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-6 flex items-center gap-2 text-amber-300">
              <Star className="h-4 w-4 fill-amber-300" />
              <span className="text-sm font-medium">IMDb {selectedEpisode.imdbRating.toFixed(1)}</span>
            </div>

            <p className="mb-6 text-sm leading-7 text-zinc-300">{selectedEpisode.description}</p>

            <section className="mb-6">
              <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                Featured Drivers
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedEpisode.drivers.map((driverSlug) => (
                  <span
                    key={driverSlug}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-200"
                  >
                    {driverNameBySlug.get(driverSlug) ?? formatSlug(driverSlug)}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-400 uppercase">Teams</h3>
              <div className="flex flex-wrap gap-2">
                {selectedEpisode.teams.map((teamSlug) => (
                  <span
                    key={teamSlug}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-200"
                  >
                    {teamNameBySlug.get(teamSlug) ?? formatSlug(teamSlug)}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                Races Covered
              </h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                {selectedEpisode.races.map((race) => (
                  <li key={race} className="rounded border border-zinc-800 bg-zinc-900/70 px-3 py-2">
                    {race}
                  </li>
                ))}
              </ul>
            </section>

            <button
              type="button"
              onClick={toggleWatched}
              className={cn(
                "w-full rounded-md border px-4 py-2 text-sm font-semibold transition-colors",
                filterState.watchedOnly
                  ? "border-red-500 bg-red-500/15 text-red-300"
                  : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-500",
              )}
            >
              {filterState.watchedOnly ? "Watched" : "Mark as Watched"}
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
