import { useState, useEffect } from "react";
import { getPopularAnime } from "../services";
import type { MediaItem } from "../types/MediaItem";

export const useFilteredPopularAnimes = (ids: number[]) => {
  const [animes, setAnimes] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        setLoading(true);
        const data: MediaItem[] = await getPopularAnime();
        const filtered = data.filter((m) => ids.includes(m.id));
        setAnimes(filtered);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (ids.length > 0) fetchAnimes();
  }, [ids]);

  return { animes, loading, error };
};
