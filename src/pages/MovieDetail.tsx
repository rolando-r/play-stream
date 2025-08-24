import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeroBanner, Information } from "../components";
import { Carousel } from "../components/Carousel";
import { getSimilarMovies } from "../services";
import { motion, AnimatePresence } from "framer-motion";

export const MoviesDetail = () => {
  const { id } = useParams();
  const moviesId = parseInt(id as string, 10);

  const [relatedMovies, setRelatedMovies] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"like" | "info">("like");

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

      <div className="flex border-b border-white/20 px-6">
        <button
          onClick={() => setActiveTab("like")}
          className={`px-4 py-2 relative font-bold ${
            activeTab === "like" ? "text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          You May Also Like
          {activeTab === "like" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("info")}
          className={`px-4 py-2 relative font-bold ${
            activeTab === "info" ? "text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          Information
          {activeTab === "info" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
          )}
        </button>
      </div>

      <section className="px-6 py-4 text-left">
        <AnimatePresence mode="wait">
          {activeTab === "like" && (
            <motion.div
              key="like"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              <Carousel title="" items={relatedMovies} />
            </motion.div>
          )}

          {activeTab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              <Information mediaId={moviesId} mediaType="movie" />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};
