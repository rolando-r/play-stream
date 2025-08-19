import { useEffect, useState } from "react";
import { getMovieDetailsWithLogos } from "../services";
import type { Movie } from "../types/Movie";

export const useMoviesWithTrailers = (movieIds: number[]) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailers, setTrailers] = useState<(string | null)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        movieIds.map(id => getMovieDetailsWithLogos(id))
      );

      setMovies(results.map(r => r?.movie).filter(Boolean));
      setTrailers(results.map(r => r?.trailerKey ?? null));

    };

    fetchData();
  }, [movieIds]);

  return { movies, trailers };
};
