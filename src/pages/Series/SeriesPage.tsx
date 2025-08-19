import { HeroBanner } from "../../components/HeroBanner";
import { usePopularSeries } from "../../hooks";

export const SeriesPage = () => {
  const { seriesIds, loading, error } = usePopularSeries(5);

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
        Error loading movies
      </div>
    );
  }

  return (
    <div>
      <HeroBanner ids={seriesIds} mediaType="tv" />
    </div>
  );
};
