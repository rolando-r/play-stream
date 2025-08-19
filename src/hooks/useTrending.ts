import { useEffect, useState } from "react";
import { getTrending } from "../services";
import type { MediaItem } from "../types/MediaItem";

export const useTrending= (limit: number = 5) => {
  const [movieIds, setMovieIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        const movies: MediaItem[] = await getTrending();
        if (isMounted) {
          setMovieIds(movies.slice(0, limit).map((m) => m.id));
        }
      } catch (err) {
        if (isMounted) setError("Failed to load movies");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { movieIds, loading, error };
};
