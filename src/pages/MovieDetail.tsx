import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeroBanner } from "../components/HeroBanner";
import { Carousel } from "../components/Carousel";
import { getSimilarMovies } from "../services";

export const MoviesDetail = () => {
  const { id } = useParams();
  const moviesId = parseInt(id as string, 10);

  const [relatedMovies, setRelatedMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!moviesId) return;

      const movies = await getSimilarMovies(moviesId);
      setRelatedMovies(movies);
      window.scrollTo(0, 0);
    };
    fetchMovies();
  }, [moviesId]);

  return (
    <div className="bg-black min-h-screen text-white">
      <HeroBanner mediaType="movie" id={moviesId} />

      <section className="p-4">
        <Carousel title="You may also like" items={relatedMovies} />
      </section>
    </div>
  );
};
