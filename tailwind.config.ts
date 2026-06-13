import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chiko: {
          blush: "#FFE4EE",
          pink: "#FF77AD",
          rose: "#FF4D8D",
          berry: "#DB3D72",
          cream: "#FFF8F2",
          vanilla: "#FFF1D8",
          butter: "#FFE79F",
          mocha: "#72544A",
          ink: "#2C2022",
          line: "#F1D6DF",
        },
      },
      boxShadow: {
        card: "0 20px 40px rgba(219, 61, 114, 0.12)",
        soft: "0 10px 30px rgba(114, 84, 74, 0.12)",
      },
      backgroundImage: {
        "chiko-bloom":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.75) 0, rgba(255,255,255,0) 34%), radial-gradient(circle at 80% 0%, rgba(255,210,225,0.9) 0, rgba(255,210,225,0) 28%), radial-gradient(circle at 85% 75%, rgba(255,231,159,0.32) 0, rgba(255,231,159,0) 22%), linear-gradient(180deg, #fff7fb 0%, #fff8f2 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
