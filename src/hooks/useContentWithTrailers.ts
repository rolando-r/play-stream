import { useEffect, useState } from "react";
import { getDetailsWithLogos } from "../services";
import type { MediaItem } from "../types/MediaItem";

export const useContentWithTrailers = (ids: number[], type: "movie" | "tv") => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [trailers, setTrailers] = useState<(string | null)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        ids.map(id => getDetailsWithLogos(id, type))
      );

      setItems(results.map(r => r?.item).filter(Boolean));
      setTrailers(results.map(r => r?.trailerKey ?? null));
    };

    if (ids.length > 0) {
      fetchData();
    }
  }, [ids, type]);

  return { items, trailers };
};
