import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chiko",
    short_name: "Chiko",
    description: "PWA-витрина меню Chiko в современном iOS-style интерфейсе.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8f2",
    theme_color: "#ff5d94",
    lang: "ru",
    icons: [
      {
        src: "/icons/chiko-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icons/chiko-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
