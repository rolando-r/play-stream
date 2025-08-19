import { HeroBanner } from "../../components/HeroBanner";
import { useTrending, usePopularMovies, useFilteredPopularMovies } from "../../hooks";
import { Carousel } from "../../components/Carousel";

export const MoviesPage = () => {
  const { movieIds, loading: trendingLoading, error: trendingError } = useTrending(5);
  const { movieIds: popularIds, loading: popularIdsLoading, error: popularIdsError } = usePopularMovies(20);

  const { movies: popularMovies, loading: popularLoading, error: popularError } = useFilteredPopularMovies(popularIds);

  if (trendingLoading || popularIdsLoading || popularLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (trendingError || popularIdsError || popularError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading movies
      </div>
    );
  }


  return (
    <div>
      <HeroBanner ids={movieIds} mediaType="movie" />
      <Carousel title="Trending" items={popularMovies} />
    </div>
  );
};
