"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import Image from "next/image";

import { driverPhotos, drivers } from "@/data/drivers";
import { teamLogos, teams } from "@/data/teams";
import { cn } from "@/lib/utils";

import { useDTSContext } from "@/context/DTSContext";

const driverNameBySlug = new Map(drivers.map((driver) => [driver.slug, driver.name]));
const teamNameBySlug = new Map(teams.map((team) => [team.slug, team.name]));

const driverPhotoNameAliases: Record<string, string> = {
  "Carlos Sainz Jr.": "Carlos Sainz",
  "Nico Hülkenberg": "Nico Hulkenberg",
  "Sergio Pérez": "Sergio Perez",
};

const teamFallbackDotClass: Record<string, string> = {
  ferrari: "bg-red-500",
  mercedes: "bg-cyan-400",
  "red-bull": "bg-indigo-500",
  mclaren: "bg-orange-500",
  alpine: "bg-blue-500",
  "aston-martin": "bg-emerald-500",
  williams: "bg-sky-500",
  haas: "bg-zinc-300",
  "alfa-romeo": "bg-red-700",
  "alpha-tauri": "bg-blue-300",
  renault: "bg-yellow-400",
  sauber: "bg-emerald-600",
  "force-india": "bg-pink-500",
  "racing-point": "bg-pink-400",
  "toro-rosso": "bg-blue-600",
};

function formatSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toReliableFormulaOneImageUrl(url: string) {
  if (!url.includes("formula1.com/")) {
    return url;
  }

  if (url.includes("media.formula1.com/")) {
    return url;
  }

  const protocolSplit = url.split("//");
  const pathWithDomain = protocolSplit[1] ?? protocolSplit[0];
  const firstSlashIndex = pathWithDomain.indexOf("/");

  if (firstSlashIndex === -1) {
    return url;
  }

  const path = pathWithDomain.slice(firstSlashIndex + 1);

  return `https://media.formula1.com/d_driver_fallback_image.png/${path}.transform/1col/image.png`;
}

function getDriverPhotoUrl(driverName: string) {
  const normalizedName = driverPhotoNameAliases[driverName] ?? driverName;
  const photoUrl = driverPhotos[normalizedName];

  if (!photoUrl) {
    return undefined;
  }

  return toReliableFormulaOneImageUrl(photoUrl);
}

function getDriverInitials(driverName: string) {
  return driverName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

type DriverAvatarProps = {
  driverName: string;
  driverPhotoUrl?: string;
};

function DriverAvatar({ driverName, driverPhotoUrl }: DriverAvatarProps) {
  const [failed, setFailed] = useState(false);
  const initials = useMemo(() => getDriverInitials(driverName), [driverName]);

  if (!driverPhotoUrl || failed) {
    return (
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 text-[10px] font-semibold text-zinc-200"
        aria-hidden="true"
      >
        {initials}
      </span>
    );
  }

  return (
    <Image
      src={driverPhotoUrl}
      alt={driverName}
      width={24}
      height={24}
      unoptimized
      onError={() => setFailed(true)}
      className="h-6 w-6 rounded-full object-cover"
    />
  );
}

export function EpisodeDetail() {
  const { selectedEpisode, setSelectedEpisode, watchedEpisodes, toggleEpisodeWatched } = useDTSContext();

  const isSelectedEpisodeWatched = selectedEpisode
    ? watchedEpisodes.includes(selectedEpisode.id)
    : false;

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
                {selectedEpisode.drivers.map((driverSlug) => {
                  const driverName = driverNameBySlug.get(driverSlug) ?? formatSlug(driverSlug);
                  const driverPhotoUrl = getDriverPhotoUrl(driverName);

                  return (
                    <span
                      key={driverSlug}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-200"
                    >
                      <DriverAvatar driverName={driverName} driverPhotoUrl={driverPhotoUrl} />
                      <span>{driverName}</span>
                    </span>
                  );
                })}
              </div>
            </section>

            <section className="mb-6">
              <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-400 uppercase">Teams</h3>
              <div className="flex flex-wrap gap-2">
                {selectedEpisode.teams.map((teamSlug) => {
                  const teamName = teamNameBySlug.get(teamSlug) ?? formatSlug(teamSlug);
                  const teamLogoUrl = teamLogos[teamSlug];

                  return (
                    <span
                      key={teamSlug}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-200"
                    >
                      {teamLogoUrl ? (
                        <Image
                          src={teamLogoUrl}
                          alt={teamName}
                          width={48}
                          height={20}
                          unoptimized
                          className="h-5 w-auto object-contain"
                        />
                      ) : (
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full",
                            teamFallbackDotClass[teamSlug] ?? "bg-zinc-500",
                          )}
                          aria-hidden="true"
                        />
                      )}
                      <span>{teamName}</span>
                    </span>
                  );
                })}
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
              onClick={() => {
                if (selectedEpisode) {
                  toggleEpisodeWatched(selectedEpisode.id);
                }
              }}
              className={cn(
                "w-full rounded-md border px-4 py-2 text-sm font-semibold transition-colors",
                isSelectedEpisodeWatched
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                  : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-500",
              )}
            >
              {isSelectedEpisodeWatched ? "Watched" : "Mark as Watched"}
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
