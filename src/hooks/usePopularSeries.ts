import { useEffect, useState } from "react";
import { getPopularSeries } from "../services";
import type { MediaItem } from "../types/MediaItem";

export const usePopularSeries = (limit: number = 5) => {
  const [seriesIds, setSeriesIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        const series: MediaItem[] = await getPopularSeries();
        if (isMounted) {
          setSeriesIds(series.slice(0, limit).map((s) => s.id));
        }
      } catch (err) {
        if (isMounted) setError("Failed to load series");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { seriesIds, loading, error };
};
