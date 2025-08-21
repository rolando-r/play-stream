import { useEffect, useState, useRef } from "react";
import { searchMulti, getInitialSearchResults, getItemImages } from "../services";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fetchWithLogos = async (data: any[]) => {
    const withLogos = await Promise.all(
      data.map(async (item) => {
        const images = await getItemImages(item);
        const logo =
          images?.logos?.find((l: any) => l.iso_639_1 === "en") ||
          images?.logos?.[0] ||
          null;
        return { ...item, logo_path: logo ? logo.file_path : null };
      })
    );
    setResults(withLogos);
  };

  const fetchPopular = async () => {
    setLoading(true);
    const data = await getInitialSearchResults();
    await fetchWithLogos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!query.trim()) {
        fetchPopular();
        return;
      }
      setLoading(true);
      const data = await searchMulti(query);
      await fetchWithLogos(data);
      setLoading(false);
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const filteredResults = results.filter((item) => item.backdrop_path);

  return { query, setQuery, inputRef, results: filteredResults, loading };
};
