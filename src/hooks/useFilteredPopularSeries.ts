import { useState, useEffect } from "react";
import { getPopularSeries } from "../services";
import type { MediaItem } from "../types/MediaItem";

export const useFilteredPopularSeries = (ids: number[]) => {
  const [series, setSeries] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const data: MediaItem[] = await getPopularSeries();
        const filtered = data.filter((m) => ids.includes(m.id));
        setSeries(filtered);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (ids.length > 0) fetchSeries();
  }, [ids]);

  return { series, loading, error };
};
