import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const isLocal = SITE_URL.includes("localhost") || SITE_URL.includes("127.0.0.1");

  return {
    rules: isLocal
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/" },
    sitemap: isLocal ? undefined : `${SITE_URL}/sitemap.xml`,
  };
}
