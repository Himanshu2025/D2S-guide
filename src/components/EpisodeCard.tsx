"use client";

import { motion } from "framer-motion";

import { drivers } from "@/data/drivers";
import { cn } from "@/lib/utils";
import type { Episode } from "@/types";

const driverNameBySlug = new Map(drivers.map((driver) => [driver.slug, driver.name]));

function formatSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type EpisodeCardProps = {
  episode: Episode;
  onClick?: () => void;
};

export function EpisodeCard({ episode, onClick }: EpisodeCardProps) {
  const featuredDrivers = episode.drivers.slice(0, 3);

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClick}
      className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950/60 px-4 py-3">
        <span className="rounded bg-zinc-800 px-2 py-1 text-xs font-semibold tracking-wide text-zinc-100">
          S{String(episode.season).padStart(2, "0")} · E{String(episode.episode).padStart(2, "0")}
        </span>
        <span className="text-sm font-medium text-amber-300">IMDb {episode.imdbRating.toFixed(1)}</span>
      </div>

      <div className="space-y-4 p-4">
        <h2 className="line-clamp-2 text-lg font-semibold text-zinc-100">{episode.title}</h2>

        <div className="flex flex-wrap gap-2">
          {featuredDrivers.map((driverSlug) => (
            <span
              key={driverSlug}
              className={cn(
                "rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200",
                "transition-colors duration-200",
              )}
            >
              {driverNameBySlug.get(driverSlug) ?? formatSlug(driverSlug)}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
