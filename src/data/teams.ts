import type { Team } from "@/types";

export const teams: Team[] = [
  {
    slug: "mercedes",
    name: "Mercedes AMG Petronas Motorsport",
    seasons: [1],
  },
  {
    slug: "ferrari",
    name: "Scuderia Ferrari",
    seasons: [1],
  },
  {
    slug: "red-bull",
    name: "Red Bull Racing",
    seasons: [1],
  },
  {
    slug: "mclaren",
    name: "McLaren F1 Team",
    seasons: [1],
  },
  {
    slug: "renault",
    name: "Renault Sport F1 Team",
    seasons: [1],
  },
  {
    slug: "haas",
    name: "Haas F1 Team",
    seasons: [1],
  },
  {
    slug: "force-india",
    name: "Force India",
    seasons: [1],
  },
  {
    slug: "sauber",
    name: "Alfa Romeo Sauber F1 Team",
    seasons: [1],
  },
  {
    slug: "toro-rosso",
    name: "Scuderia Toro Rosso",
    seasons: [1],
  },
  {
    slug: "williams",
    name: "Williams Martini Racing",
    seasons: [1],
  },
];

export const teamLogos: Record<string, string> = {
  "alfa-romeo": "https://www.formula1.com/content/dam/fom-website/teams/2024/alfa-romeo-logo.png",
  "alpha-tauri": "https://www.formula1.com/content/dam/fom-website/teams/2024/alpha-tauri-logo.png",
  alpine: "https://www.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png",
  "aston-martin": "https://www.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png",
  ferrari: "https://www.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png",
  "force-india": "https://www.formula1.com/content/dam/fom-website/teams/2024/force-india-logo.png",
  haas: "https://www.formula1.com/content/dam/fom-website/teams/2024/haas-logo.png",
  mclaren: "https://www.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png",
  mercedes: "https://www.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png",
  "racing-point": "https://www.formula1.com/content/dam/fom-website/teams/2024/racing-point-logo.png",
  "red-bull": "https://www.formula1.com/content/dam/fom-website/teams/2024/red-bull-logo.png",
  renault: "https://www.formula1.com/content/dam/fom-website/teams/2024/renault-logo.png",
  sauber: "https://www.formula1.com/content/dam/fom-website/teams/2024/sauber-logo.png",
  "toro-rosso": "https://www.formula1.com/content/dam/fom-website/teams/2024/toro-rosso-logo.png",
  williams: "https://www.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png",
};
