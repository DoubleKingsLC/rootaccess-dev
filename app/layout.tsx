import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-label",
  display: "swap"
});

export const metadata: Metadata = {
  title: "RootAccess.tech",
  description: "Interactive scrollytelling roadmaps",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/ra-favicon.png", sizes: "32x32" }
    ]
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${manrope.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=check_circle,code,expand_more,hub,insights,key,keyboard_double_arrow_down,lan,lock,lock_open,menu_book,priority_high,psychology,route,schedule,security,spider,stairs,terminal,workspace_premium" />
      </head>
      <body className="font-sans antialiased text-on-background bg-background">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

