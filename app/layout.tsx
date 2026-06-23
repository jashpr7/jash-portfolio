import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jash Prajapati — Graphic Designer & Visual Artist",
    template: "%s — Jash Prajapati",
  },
  description:
    "Independent graphic designer, video editor, 3D artist and animator creating bold identities, cinematic visuals and immersive digital experiences.",
  keywords: [
    "Jash Prajapati",
    "graphic designer",
    "video editor",
    "3D artist",
    "motion designer",
    "visual artist",
    "portfolio",
  ],
  authors: [{ name: "Jash Prajapati" }],
  creator: "Jash Prajapati",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Jash Prajapati — Creative Portfolio",
    description:
      "Graphic design, motion, video editing and 3D art shaped into memorable visual experiences.",
    url: SITE_URL,
    siteName: "Jash Prajapati Portfolio",
    images: [
      {
        url: "/images/og-cover.webp",
        width: 1200,
        height: 630,
        alt: "Jash Prajapati creative portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jash Prajapati — Creative Portfolio",
    description: "Graphic Designer × Video Editor × 3D Artist × Animator",
    images: ["/images/og-cover.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#f7f4ee",
  colorScheme: "light",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
