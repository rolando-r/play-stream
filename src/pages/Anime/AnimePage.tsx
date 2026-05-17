import { HeroBanner } from "../../components/HeroBanner";
import { Carousel } from "../../components/Carousel";
import { useFetchMedia } from "../../hooks";
import { getPopularAnime } from "../../services";

export const AnimePage = () => {
  const {
    items: animes,
    loading,
    error,
  } = useFetchMedia(getPopularAnime, 20);

  const trendingAnimes = animes.slice(0, 5);
  const popularAnimes = animes;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (error) {
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
