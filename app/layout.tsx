import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaRegister from "@/components/PwaRegister";

export const metadata: Metadata = {
  title: {
    default: "Chiko",
    template: "%s | Chiko",
  },
  description:
    "Визуально выверенное PWA-приложение для Chiko: iOS-style блоки, интерактивное меню, избранное и готовность к Docker/Vercel.",
  applicationName: "Chiko",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/chiko-icon.svg",
    apple: "/icons/chiko-icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Chiko",
  },
};

export const viewport: Viewport = {
  themeColor: "#ff5d94",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
