const fallbackUrl = "http://localhost:3000";

function normalizeUrl(value: string): string {
  return value.replace(/\/$/, "");
}

export const SITE_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl,
);
