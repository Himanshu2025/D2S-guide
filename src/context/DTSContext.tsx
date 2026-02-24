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
  | { type: "toggleTeam"; payload: string }
  | { type: "toggleWatched" };

type DTSContextValue = {
  filterState: FilterState;
  dispatch: Dispatch<DTSAction>;
  setSeason: (season: FilterState["season"]) => void;
  toggleDriver: (driver: string) => void;
  toggleTeam: (team: string) => void;
  toggleWatched: () => void;
};

const initialFilterState: FilterState = {
  season: "all",
  drivers: [],
  teams: [],
  races: [],
  watchedOnly: false,
  highlightMode: false,
};

const DTSContext = createContext<DTSContextValue | null>(null);

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
    case "toggleTeam": {
      const hasTeam = state.teams.includes(action.payload);

      return {
        ...state,
        teams: hasTeam
          ? state.teams.filter((team) => team !== action.payload)
          : [...state.teams, action.payload],
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
      toggleTeam: (team) => dispatch({ type: "toggleTeam", payload: team }),
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
