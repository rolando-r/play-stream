import { HeroBanner } from "../../components/HeroBanner";
import { usePopularAnimes } from "../../hooks";

export const AnimePage = () => {
  const { animeIds, loading, error } = usePopularAnimes(5);

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
      <HeroBanner movieIds={animeIds} />
    </div>
  );
};
