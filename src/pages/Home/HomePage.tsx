import { HeroBanner } from "../../components/HeroBanner";
import { Carousel } from "../../components/Carousel";
import {
  getTrending,
  getPopularMovies,
  getPopularSeries,
  getNowPlayingMovies,
} from "../../services";
import { useFetchMedia } from "../../hooks";

export const HomePage = () => {
  const {
    items: trending,
    loading: trendingLoading,
    error: trendingError,
  } = useFetchMedia(() => getTrending("movie"), 5);

  const {
    items: popularMovies,
    loading: popularLoading,
    error: popularError,
  } = useFetchMedia(getPopularMovies, 20);

  const {
    items: popularSeries,
    loading: seriesLoading,
    error: seriesError,
  } = useFetchMedia(getPopularSeries, 20);

  const {
    items: nowPlayingMovies,
    loading: nowPlayingLoading,
    error: nowPlayingError,
  } = useFetchMedia(getNowPlayingMovies, 20);

  const isLoading = [
    trendingLoading,
    popularLoading,
    seriesLoading,
    nowPlayingLoading,
  ].some(Boolean);
  const hasError = [
    trendingError,
    popularError,
    seriesError,
    nowPlayingError,
  ].some(Boolean);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading movies
      </div>
    );
  }

  return (
    <div>
      <HeroBanner ids={trending.map((m) => m.id)} mediaType="movie" />
      <Carousel title="Trending" items={popularMovies} />
      {/* <Carousel title="Top 10 Series" items={popularMovies} /> */}
      <Carousel title="Popular Series" items={popularSeries} />
      {/* <Carousel title="Top 10 Movies" items={popularMovies} /> */}
      <Carousel title="Now Playing" items={nowPlayingMovies} />
      {/* <Carousel title="Universes" items={popularMovies} /> */}
    </div>
  );
};
