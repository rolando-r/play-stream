import { useState, useEffect } from "react";
import { getPopularMovies } from "../services";
import type { MediaItem } from "../types/MediaItem";

export const useFilteredPopularMovies = (ids: number[]) => {
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data: MediaItem[] = await getPopularMovies();
        const filtered = data.filter((m) => ids.includes(m.id));
        setMovies(filtered);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (ids.length > 0) fetchMovies();
  }, [ids]);

  return { movies, loading, error };
};
