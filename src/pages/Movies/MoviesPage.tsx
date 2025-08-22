import { HeroBanner } from "../../components/HeroBanner";
import { Carousel } from "../../components/Carousel";
import { useFetchMedia } from "../../hooks";
import { getTrending, getPopularMovies } from "../../services";

export const MoviesPage = () => {
  const {
    items: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetchMedia(() => getTrending("movie", "day"), 5);

  const {
    items: popularMovies,
    loading: popularLoading,
    error: popularError,
  } = useFetchMedia(getPopularMovies, 20);

  if (trendingLoading || popularLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (trendingError || popularError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading movies
      </div>
    );
  }

  return (
    <div>
      <HeroBanner ids={trendingMovies.map((m) => m.id)} mediaType="movie" />
      <Carousel title="Popular Movies" items={popularMovies} />
    </div>
  );
};
