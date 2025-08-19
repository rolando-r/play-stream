import { HeroBanner } from "../../components/HeroBanner";
import { Carousel } from "../../components/Carousel";
import { usePopularSeries, useFilteredPopularSeries } from "../../hooks";

export const SeriesPage = () => {
  const { seriesIds: trendingIds, loading: trendingLoading, error: trendingError } = usePopularSeries(5);
  const { seriesIds: popularIds, loading: popularIdsLoading, error: popularIdsError } = usePopularSeries(20);

  const { series: popularSeries, loading: popularLoading, error: popularError } = useFilteredPopularSeries(popularIds);

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
      <Carousel title="Trending" items={popularSeries} />
    </div>
  );
};