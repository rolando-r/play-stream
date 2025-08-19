import { HeroBanner } from "../../components/HeroBanner";
import { Carousel } from "../../components/Carousel";
import { usePopularAnimes, useFilteredPopularAnimes } from "../../hooks";

export const AnimePage = () => {
  const { animeIds: trendingIds, loading: trendingLoading, error: trendingError } = usePopularAnimes(5);
  const { animeIds: popularIds, loading: popularIdsLoading, error: popularIdsError } = usePopularAnimes(20);

  const { animes: popularAnimes, loading: popularLoading, error: popularError } = useFilteredPopularAnimes(popularIds);

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
        Error loading animes
      </div>
    );
  }

  return (
    <div>
      <HeroBanner ids={trendingIds} mediaType="tv" />
      <Carousel title="Trending" items={popularAnimes} />
    </div>
  );
};
