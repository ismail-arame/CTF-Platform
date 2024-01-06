import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

// cryptoColor: "#668EBF",
// pwnColor: "#A06DB7",
// revColor: "#CA6564",
// webColor: "#70C286",
// forensicsColor: "#FBF57B",
// otherColor: "#DAFFC4",
// challengesColor: "#24272A",
// challengesBorderColor: "#44484B",
