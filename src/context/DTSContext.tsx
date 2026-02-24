"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

import type { FilterState } from "@/types";

type DTSAction =
  | { type: "setSeason"; payload: FilterState["season"] }
  | { type: "toggleDriver"; payload: string }
  | { type: "clearDrivers" }
  | { type: "toggleTeam"; payload: string }
  | { type: "setSearchQuery"; payload: string }
  | { type: "toggleSortByRating" }
  | { type: "toggleWatched" };

type DTSContextValue = {
  filterState: FilterState;
  dispatch: Dispatch<DTSAction>;
  setSeason: (season: FilterState["season"]) => void;
  toggleDriver: (driver: string) => void;
  clearDrivers: () => void;
  toggleTeam: (team: string) => void;
  setSearchQuery: (query: string) => void;
  toggleSortByRating: () => void;
  toggleWatched: () => void;
};

const initialFilterState: FilterState = {
  season: "all",
  drivers: [],
  teams: [],
  races: [],
  searchQuery: "",
  sortByRating: false,
  watchedOnly: false,
  highlightMode: false,
};

const DTSContext = createContext<DTSContextValue | null>(null);

export function matchesDriverTeamFilters(
  episodeDrivers: string[],
  episodeTeams: string[],
  filterState: FilterState,
) {
  const hasDriverFilters = filterState.drivers.length > 0;
  const hasTeamFilters = filterState.teams.length > 0;

  if (!hasDriverFilters && !hasTeamFilters) {
    return true;
  }

  const driverMatch = episodeDrivers.some((driver) => filterState.drivers.includes(driver));
  const teamMatch = episodeTeams.some((team) => filterState.teams.includes(team));

  if (hasDriverFilters && hasTeamFilters) {
    return driverMatch || teamMatch;
  }

  if (hasDriverFilters) {
    return driverMatch;
  }

  return teamMatch;
}

function dtsReducer(state: FilterState, action: DTSAction): FilterState {
  switch (action.type) {
    case "setSeason": {
      return {
        ...state,
        season: action.payload,
      };
    }
    case "toggleDriver": {
      const hasDriver = state.drivers.includes(action.payload);

      return {
        ...state,
        drivers: hasDriver
          ? state.drivers.filter((driver) => driver !== action.payload)
          : [...state.drivers, action.payload],
      };
    }
    case "clearDrivers": {
      return {
        ...state,
        drivers: [],
      };
    }
    case "toggleTeam": {
      const hasTeam = state.teams.includes(action.payload);

      return {
        ...state,
        teams: hasTeam
          ? state.teams.filter((team) => team !== action.payload)
          : [...state.teams, action.payload],
      };
    }
    case "setSearchQuery": {
      return {
        ...state,
        searchQuery: action.payload,
      };
    }
    case "toggleSortByRating": {
      return {
        ...state,
        sortByRating: !state.sortByRating,
      };
    }
    case "toggleWatched": {
      return {
        ...state,
        watchedOnly: !state.watchedOnly,
      };
    }
    default: {
      return state;
    }
  }
}

export function DTSProvider({ children }: { children: ReactNode }) {
  const [filterState, dispatch] = useReducer(dtsReducer, initialFilterState);

  const value = useMemo<DTSContextValue>(
    () => ({
      filterState,
      dispatch,
      setSeason: (season) => dispatch({ type: "setSeason", payload: season }),
      toggleDriver: (driver) => dispatch({ type: "toggleDriver", payload: driver }),
      clearDrivers: () => dispatch({ type: "clearDrivers" }),
      toggleTeam: (team) => dispatch({ type: "toggleTeam", payload: team }),
      setSearchQuery: (query) => dispatch({ type: "setSearchQuery", payload: query }),
      toggleSortByRating: () => dispatch({ type: "toggleSortByRating" }),
      toggleWatched: () => dispatch({ type: "toggleWatched" }),
    }),
    [filterState],
  );

  return <DTSContext.Provider value={value}>{children}</DTSContext.Provider>;
}

export function useDTSContext() {
  const context = useContext(DTSContext);

  if (!context) {
    throw new Error("useDTSContext must be used within DTSProvider");
  }

  return context;
}
