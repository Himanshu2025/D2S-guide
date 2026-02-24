import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [scrollbarHide],
} satisfies Config;

export default config;
