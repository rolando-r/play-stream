import { useEffect, useState } from "react";
import { getDetailsWithLogos, getOmdbInfo } from "../services";

export const useMediaInformation = (mediaId: number, mediaType: "movie" | "tv") => {
  const [tmdbData, setTmdbData] = useState<any>(null);
  const [omdbData, setOmdbData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const tmdb = await getDetailsWithLogos(mediaId, mediaType);
      if (!tmdb) return;

      const omdb = tmdb.item.imdb_id ? await getOmdbInfo(tmdb.item.imdb_id) : null;

      setTmdbData(tmdb.item);
      setOmdbData(omdb);
      setLoading(false);
    };
    fetchData();
  }, [mediaId, mediaType]);

  return { tmdbData, omdbData, loading };
};
