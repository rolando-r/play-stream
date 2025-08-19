import { HeroBanner } from "../../components/HeroBanner";
import { useTrending } from "../../hooks/";

export const HomePage = () => {
  const { movieIds, loading, error } = useTrending(5);

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
      <HeroBanner movieIds={movieIds} />
    </div>
  );
};
