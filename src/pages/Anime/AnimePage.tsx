import { HeroBanner } from "../../components/HeroBanner";
import { Carousel } from "../../components/Carousel";
import { useFetchMedia } from "../../hooks";
import { getPopularAnime } from "../../services";

export const AnimePage = () => {
  const {
    items: trendingAnimes,
    loading: trendingLoading,
    error: trendingError,
  } = useFetchMedia(getPopularAnime, 5);

  const {
    items: popularAnimes,
    loading: popularLoading,
    error: popularError,
  } = useFetchMedia(getPopularAnime, 20);

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
        Error loading animes
      </div>
    );
  }

  return (
    <div>
      <HeroBanner ids={trendingAnimes.map((a) => a.id)} mediaType="tv" />
      <Carousel title="Popular Animes" items={popularAnimes} />
    </div>
  );
};
