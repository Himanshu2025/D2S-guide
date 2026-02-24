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
