import { useEffect, useState } from "react";
import type { MediaItem } from "../types/MediaItem";

export const useFetchMedia = (
  fetchFn: () => Promise<MediaItem[]>,
  limit: number = 5
) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await fetchFn();
        if (isMounted) setItems(data.slice(0, limit));
      } catch (err) {
        if (isMounted) setError("Failed to load data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFn, limit]);

  return { items, loading, error };
};
