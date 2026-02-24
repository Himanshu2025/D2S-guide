"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

import type { Episode, FilterState } from "@/types";

type DTSState = {
  filterState: FilterState;
  watchedEpisodes: string[];
  selectedEpisode: Episode | null;
};

type DTSAction =
  | { type: "setSeason"; payload: FilterState["season"] }
  | { type: "toggleTopRated" }
  | { type: "toggleDriver"; payload: string }
  | { type: "clearDrivers" }
  | { type: "toggleTeam"; payload: string }
  | { type: "setSearchQuery"; payload: string }
  | { type: "toggleSortByRating" }
  | { type: "toggleWatched" }
  | { type: "toggleEpisodeWatched"; payload: string }
  | { type: "setSelectedEpisode"; payload: Episode | null };

type DTSContextValue = {
  filterState: FilterState;
  watchedEpisodes: string[];
  selectedEpisode: Episode | null;
  dispatch: Dispatch<DTSAction>;
  setSeason: (season: FilterState["season"]) => void;
  toggleTopRated: () => void;
  toggleDriver: (driver: string) => void;
  clearDrivers: () => void;
  toggleTeam: (team: string) => void;
  setSearchQuery: (query: string) => void;
  toggleSortByRating: () => void;
  toggleWatched: () => void;
  toggleEpisodeWatched: (episodeId: string) => void;
  setSelectedEpisode: (episode: Episode | null) => void;
};

const initialFilterState: FilterState = {
  season: "all",
  topRated: false,
  drivers: [],
  teams: [],
  races: [],
  searchQuery: "",
  sortByRating: false,
  watchedOnly: false,
  highlightMode: false,
};

const initialState: DTSState = {
  filterState: initialFilterState,
  watchedEpisodes: [],
  selectedEpisode: null,
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

function dtsReducer(state: DTSState, action: DTSAction): DTSState {
  switch (action.type) {
    case "setSeason": {
      return {
        ...state,
        filterState: {
          ...state.filterState,
          season: action.payload,
          topRated: false,
        },
      };
    }
    case "toggleTopRated": {
      return {
        ...state,
        filterState: {
          ...state.filterState,
          topRated: !state.filterState.topRated,
        },
      };
    }
    case "toggleDriver": {
      const hasDriver = state.filterState.drivers.includes(action.payload);

      return {
        ...state,
        filterState: {
          ...state.filterState,
          drivers: hasDriver
            ? state.filterState.drivers.filter((driver) => driver !== action.payload)
            : [...state.filterState.drivers, action.payload],
        },
      };
    }
    case "clearDrivers": {
      return {
        ...state,
        filterState: {
          ...state.filterState,
          drivers: [],
        },
      };
    }
    case "toggleTeam": {
      const hasTeam = state.filterState.teams.includes(action.payload);

      return {
        ...state,
        filterState: {
          ...state.filterState,
          teams: hasTeam
            ? state.filterState.teams.filter((team) => team !== action.payload)
            : [...state.filterState.teams, action.payload],
        },
      };
    }
    case "setSearchQuery": {
      return {
        ...state,
        filterState: {
          ...state.filterState,
          searchQuery: action.payload,
        },
      };
    }
    case "toggleSortByRating": {
      return {
        ...state,
        filterState: {
          ...state.filterState,
          sortByRating: !state.filterState.sortByRating,
        },
      };
    }
    case "toggleWatched": {
      return {
        ...state,
        filterState: {
          ...state.filterState,
          watchedOnly: !state.filterState.watchedOnly,
        },
      };
    }
    case "toggleEpisodeWatched": {
      const isWatched = state.watchedEpisodes.includes(action.payload);

      return {
        ...state,
        watchedEpisodes: isWatched
          ? state.watchedEpisodes.filter((episodeId) => episodeId !== action.payload)
          : [...state.watchedEpisodes, action.payload],
      };
    }
    case "setSelectedEpisode": {
      return {
        ...state,
        selectedEpisode: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export function DTSProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dtsReducer, initialState);

  const value = useMemo<DTSContextValue>(
    () => ({
      filterState: state.filterState,
      watchedEpisodes: state.watchedEpisodes,
      selectedEpisode: state.selectedEpisode,
      dispatch,
      setSeason: (season) => dispatch({ type: "setSeason", payload: season }),
      toggleTopRated: () => dispatch({ type: "toggleTopRated" }),
      toggleDriver: (driver) => dispatch({ type: "toggleDriver", payload: driver }),
      clearDrivers: () => dispatch({ type: "clearDrivers" }),
      toggleTeam: (team) => dispatch({ type: "toggleTeam", payload: team }),
      setSearchQuery: (query) => dispatch({ type: "setSearchQuery", payload: query }),
      toggleSortByRating: () => dispatch({ type: "toggleSortByRating" }),
      toggleWatched: () => dispatch({ type: "toggleWatched" }),
      toggleEpisodeWatched: (episodeId) => dispatch({ type: "toggleEpisodeWatched", payload: episodeId }),
      setSelectedEpisode: (episode) => dispatch({ type: "setSelectedEpisode", payload: episode }),
    }),
    [state],
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
