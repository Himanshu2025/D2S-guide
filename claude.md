# CLAUDE.md — D2S Guide

## Project Overview
A Netflix-style web app for browsing all Drive to Survive (F1 documentary) episodes.
Users can filter by season, driver, team, and race. Includes IMDB ratings and a
personalised watchlist. Built to showcase product-quality UI and advanced React patterns.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode — no `any` types ever)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Animations:** Framer Motion
- **State:** useReducer + Context (no external state library)
- **Storage:** localStorage (no backend/DB needed)
- **Deployment:** Vercel

## Folder Structure
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── episode/[id]/
├── components/
│   ├── ui/
│   ├── EpisodeCard.tsx
│   ├── EpisodeGrid.tsx
│   ├── FilterBar.tsx
│   ├── DriverFilterBar.tsx
│   ├── TeamFilterBar.tsx
│   ├── SeasonTabs.tsx
│   └── EpisodeDetail.tsx
├── context/
│   └── DTSContext.tsx
├── data/
│   ├── episodes.ts
│   ├── drivers.ts
│   └── teams.ts
├── hooks/
│   └── useFilteredEpisodes.ts
├── lib/
│   └── utils.ts
└── types/
    └── index.ts

## TypeScript Types
Always define types in src/types/index.ts and import from there.

export type Episode = {
  id: string;
  season: number;
  episode: number;
  title: string;
  description: string;
  drivers: string[];
  teams: string[];
  races: string[];
  imdbRating: number;
  imdbVotes: number;
  airDate: string;
  thumbnailUrl?: string;
};

export type Driver = {
  slug: string;
  name: string;
  team: string;
  nationality: string;
  seasons: number[];
};

export type Team = {
  slug: string;
  name: string;
  seasons: number[];
};

export type FilterState = {
  season: number | "all";
  drivers: string[];
  teams: string[];
  races: string[];
  watchedOnly: boolean;
  highlightMode: boolean;
};

## Coding Rules
- Server components by default; add "use client" only when needed
- Always use named exports, never default exports for components
- One component per file
- No inline styles — Tailwind only
- All data files must be typed — never use raw objects without a type
- Use cn() from lib/utils.ts for conditional classNames
- Framer Motion only on Client Components
- No any types ever

## UI Design Principles
- Dark theme — Netflix/Letterboxd inspired
- Episode cards show: thumbnail, season/episode badge, title, IMDB rating, featured drivers
- Responsive grid: 1 col mobile → 2 col tablet → 3-4 col desktop
- Smooth Framer Motion transitions on card hover and filter changes
- Filter bar is sticky at the top below the header

## Data Files Convention
All data lives in /src/data/ as plain TypeScript arrays — no API calls, no DB.

## Current Milestones
- v0.1 — Repo setup, types, data files (episodes, drivers, teams), static grid
- v0.2 — Netflix-style dark UI, EpisodeCard, SeasonTabs, EpisodeDetail panel
- v1.0 — Filter bars (driver, team, race), useReducer context, useMemo filtering
- v1.1 — IMDB ratings tab, watched toggle, progress bar, Framer Motion polish

## What NOT to Do
- Do not use Redux or Zustand — useReducer + Context is sufficient
- Do not add a backend or database — localStorage only
- Do not use any TypeScript types
- Do not use default exports for components
- Do not install unnecessary packages
