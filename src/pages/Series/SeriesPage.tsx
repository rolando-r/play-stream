import { HeroBanner } from "../../components/HeroBanner";
import { Carousel } from "../../components/Carousel";
import { useFetchMedia } from "../../hooks";
import { getTrending, getPopularSeries } from "../../services";

export const SeriesPage = () => {
  const {
    items: trendingSeries,
    loading: trendingLoading,
    error: trendingError,
  } = useFetchMedia(() => getTrending("tv", "day"), 5);

  const {
    items: popularSeries,
    loading: popularLoading,
    error: popularError,
  } = useFetchMedia(getPopularSeries, 20);

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
        Error loading series
      </div>
    );
  }

  return (
    <div>
      <HeroBanner ids={trendingSeries.map((s) => s.id)} mediaType="tv" />
      <Carousel title="Popular Series" items={popularSeries} />
    </div>
  );
};
