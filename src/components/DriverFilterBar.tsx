"use client";

import { drivers } from "@/data/drivers";
import { cn } from "@/lib/utils";

import { useDTSContext } from "@/context/DTSContext";

export function DriverFilterBar() {
  const { filterState, toggleDriver, clearDrivers } = useDTSContext();
  const hasSelectedDrivers = filterState.drivers.length > 0;

  return (
    <section className="border-b border-white/10 bg-black">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">Drivers</h2>
          {hasSelectedDrivers && (
            <button
              type="button"
              onClick={clearDrivers}
              className="text-xs font-medium text-red-400 transition-colors hover:text-red-300"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {drivers.map((driver) => {
            const isSelected = filterState.drivers.includes(driver.slug);

            return (
              <button
                key={driver.slug}
                type="button"
                onClick={() => toggleDriver(driver.slug)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                  isSelected
                    ? "border-red-500 bg-red-500/15 text-red-200"
                    : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500",
                )}
              >
                {driver.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
