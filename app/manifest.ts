import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jash Prajapati - Creative Portfolio",
    short_name: "Jash Portfolio",
    description: "Graphic Designer × Video Editor × 3D Artist × Animator",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4ee",
    theme_color: "#f7f4ee",
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png+xml" }],
  };
}
