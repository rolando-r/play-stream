import { HeroBanner } from "../../components/HeroBanner";
import { usePopularMovies } from "../../hooks";

export const MoviesPage = () => {
  const { movieIds, loading, error } = usePopularMovies(5);

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
