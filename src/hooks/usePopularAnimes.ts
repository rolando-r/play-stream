import { useEffect, useState } from "react";
import { getPopularAnime } from "../services";
import type { Serie } from "../types/Serie";

export const usePopularAnimes = (limit: number = 5) => {
  const [animeIds, setAnimeIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        const animes: Serie[] = await getPopularAnime();
        if (isMounted) {
          setAnimeIds(animes.slice(0, limit).map((s) => s.id));
        }
      } catch (err) {
        if (isMounted) setError("Failed to load animes");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { animeIds, loading, error };
};
