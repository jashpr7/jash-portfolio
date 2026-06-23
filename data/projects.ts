export type Project = {
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  year: string;
  image: string;
  alt: string;
  accent: string;
  softAccent: string;
  description: string;
  tools: string[];
  orientation: "portrait" | "landscape";
  aspectRatio: string;
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "bmw-i7-campaign-study",
    title: "BMW i7 — CAMPAIGN STUDY",
    shortTitle: "BMW i7",
    category: "Photoshop / Automotive Poster",
    year: "2026",
    image: "/images/projects/bmw-i7-campaign.webp",
    alt: "BMW i7 automotive advertising poster designed by Jash Prajapati",
    accent: "#6daeff",
    softAccent: "#e0efff",
    description:
      "An automotive key visual combining dramatic weather, reflective surfaces, motion-led typography and a cool cinematic palette.",
    tools: ["Photoshop", "Photo compositing", "Art direction"],
    orientation: "portrait",
    aspectRatio: "1273 / 1800",
  },
  {
    number: "02",
    slug: "apocalypse-editorial-collage",
    title: "APOCALYPSE — EDITORIAL COLLAGE",
    shortTitle: "Apocalypse",
    category: "Photoshop / Music Poster Study",
    year: "2026",
    image: "/images/projects/apocalypse-collage.webp",
    alt: "Monochrome editorial music collage poster created by Jash Prajapati",
    accent: "#a08dff",
    softAccent: "#eeeaff",
    description:
      "A black-and-white collage study built from concert imagery, hand-drawn elements, grain and restrained editorial typography.",
    tools: ["Photoshop", "Editorial layout", "Texture design"],
    orientation: "landscape",
    aspectRatio: "1800 / 1440",
  },
  {
    number: "03",
    slug: "spiral-galaxy-render",
    title: "SPIRAL GALAXY — 3D STUDY",
    shortTitle: "Spiral Galaxy",
    category: "Blender / Procedural Space Render",
    year: "2026",
    image: "/images/projects/spiral-galaxy.webp",
    alt: "Colourful spiral galaxy render created in Blender by Jash Prajapati",
    accent: "#d46cff",
    softAccent: "#f6e2ff",
    description:
      "A procedural cosmic render exploring particle density, luminous colour bands, atmospheric falloff and deep-space contrast.",
    tools: ["Blender", "Particles", "Lighting"],
    orientation: "landscape",
    aspectRatio: "1800 / 1013",
  },
  {
    number: "04",
    slug: "neon-gtr-environment",
    title: "NEON GT-R — ENVIRONMENT RENDER",
    shortTitle: "Neon GT-R",
    category: "Blender / Automotive Visualisation",
    year: "2026",
    image: "/images/projects/neon-gtr-render.webp",
    alt: "Nissan GT-R in a neon graffiti garage rendered by Jash Prajapati",
    accent: "#4c72ff",
    softAccent: "#e5eaff",
    description:
      "A stylised automotive scene focused on wet-floor reflections, neon colour contrast, graffiti scale and cinematic composition.",
    tools: ["Blender", "Environment design", "Lighting"],
    orientation: "landscape",
    aspectRatio: "1800 / 1013",
  },
  {
    number: "05",
    slug: "bmw-m4-poster-study",
    title: "BMW M4 — POSTER STUDY",
    shortTitle: "BMW M4",
    category: "Photoshop / Automotive Poster",
    year: "2026",
    image: "/images/projects/bmw-m4-poster.webp",
    alt: "BMW M4 promotional poster study designed by Jash Prajapati",
    accent: "#8cbcff",
    softAccent: "#e6f1ff",
    description:
      "A clean promotional layout using modular image panels, strong hierarchy and a restrained performance-inspired visual system.",
    tools: ["Photoshop", "Layout design", "Typography"],
    orientation: "portrait",
    aspectRatio: "1350 / 1800",
  },
  {
    number: "06",
    slug: "red-planet-render",
    title: "RED PLANET — SPACE RENDER",
    shortTitle: "Red Planet",
    category: "Blender / Planetary Visualisation",
    year: "2026",
    image: "/images/projects/red-planet.webp",
    alt: "Red planet floating in a star field rendered by Jash Prajapati",
    accent: "#ff805f",
    softAccent: "#ffe8df",
    description:
      "A planetary render balancing surface texture, rim light, shadow falloff and a quiet cinematic star-field composition.",
    tools: ["Blender", "Materials", "Compositing"],
    orientation: "landscape",
    aspectRatio: "1800 / 1013",
  },
];
