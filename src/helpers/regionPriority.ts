import type { MediaItem } from "../types/MediaItem";

const WESTERN_LANGUAGES = new Set([
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "nl",
  "sv",
  "no",
  "da",
  "fi",
  "pl",
  "el",
  "cs",
  "ro",
]);

const isWesternContent = (item: MediaItem): boolean => {
  return !!item.original_language && WESTERN_LANGUAGES.has(item.original_language);
};

export const prioritizeWesternContent = (items: MediaItem[]): MediaItem[] => {
  return [...items].sort((a, b) => {
    const aWestern = isWesternContent(a);
    const bWestern = isWesternContent(b);
    if (aWestern === bWestern) return 0;
    return aWestern ? -1 : 1;
  });
};