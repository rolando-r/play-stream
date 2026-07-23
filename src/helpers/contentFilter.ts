import type { MediaItem } from "../types/MediaItem";

// Keywords for a second manual filter on overview/title
const BLOCKED_TERMS = [
  "ecchi",
  "hentai",
  "explicit content",
  "explicit sexual",
  "erotic",
  "erótico",
  "nudity",
  "fan service",
  "fanservice",
];

const containsBlockedContent = (item: MediaItem): boolean => {
  const text = `${item.name || ""} ${item.overview || ""}`.toLowerCase();
  return BLOCKED_TERMS.some((term) => text.includes(term));
};

/**
 * Filter by adult content and blocked terms in overview/title,
 * and sort by vote count descending (real popularity).
 */
export const filterExplicitContent = (items: MediaItem[]): MediaItem[] => {
  return items
    .filter((item) => item.adult !== true)
    .filter((item) => !containsBlockedContent(item))
    .sort((a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0));
};