"use client";

import { teams } from "@/data/teams";
import { cn } from "@/lib/utils";

import { useDTSContext } from "@/context/DTSContext";

export function TeamFilterBar() {
  const { filterState, toggleTeam } = useDTSContext();

  return (
    <section className="border-b border-white/10 bg-black">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-xs font-semibold tracking-wide text-zinc-400 uppercase">Teams</h2>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {teams.map((team) => {
            const isSelected = filterState.teams.includes(team.slug);

            return (
              <button
                key={team.slug}
                type="button"
                onClick={() => toggleTeam(team.slug)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                  isSelected
                    ? "border-red-500 bg-red-500/15 text-red-200"
                    : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500",
                )}
              >
                {team.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
