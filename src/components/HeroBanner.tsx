import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInfoCircle,
  FaVolumeUp,
  FaVolumeMute,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import {
  useScreenSize,
  useVideoZoom,
  useYouTubePlayer,
  useCarousel,
  useContentWithTrailers,
  useVideoProgress,
} from "../hooks";
import { PreloadImage } from "./PreloadImage";

interface HeroBannerProps {
  ids: number[];
  mediaType: "movie" | "tv";
}

export const HeroBanner = ({ ids = [], mediaType }: HeroBannerProps) => {
  const { items, trailers } = useContentWithTrailers(ids, mediaType);
  const {
    currentIndex,
    setCurrentIndex,
    progress,
    setProgress,
    handleNext,
    handlePrev,
  } = useCarousel(ids.length);

  const [isMuted, setIsMuted] = useState(true);

  const isLargeScreen = useScreenSize();
  const zoomFactor = useVideoZoom(isLargeScreen);

  const { playerRef, isVideoReady, duration } = useYouTubePlayer(
    trailers[currentIndex],
    isLargeScreen,
    isMuted
  );

  useVideoProgress(playerRef, duration, setProgress, handleNext);

  const handleMuteToggle = () => {
    if (!playerRef.current) return;
    isMuted ? playerRef.current.unMute() : playerRef.current.mute();
    setIsMuted(!isMuted);
  };

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const data = items[currentIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden group">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        {data && (
          <img
            key={currentIndex}
            className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500"
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt={data.title || data.name}
            onLoad={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "1";
            }}
            loading="lazy"
          />
        )}

        {/* YouTube Player */}
        {trailers[currentIndex] && isLargeScreen && (
          <div
            className="w-full h-full absolute top-0 left-0 transition-opacity duration-700"
            style={{
              opacity: isVideoReady ? 1 : 0,
              transform: `scale(${zoomFactor})`,
              transformOrigin: "center center",
            }}
          >
            <div id="yt-player" className="w-full h-full"></div>
          </div>
        )}
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 
             text-zinc-400 hover:text-white 
             p-3 rounded-full 
             opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
             transition-opacity"
      >
        <FaChevronLeft size={25} />
      </button>
      <button
        onClick={handleNext}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 
             text-zinc-400 hover:text-white 
             p-3 rounded-full 
             opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
             transition-opacity"
      >
        <FaChevronRight size={25} />
      </button>

      {/* Interface */}
      <AnimatePresence mode="wait">
        {data && (
          <motion.div
            key={currentIndex}
            className="absolute bottom-12 sm:bottom-24 left-0 right-0 sm:left-15 sm:right-auto px-4 sm:px-0 text-white max-w-full sm:max-w-lg text-center sm:text-left flex flex-col items-center sm:items-start"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {data.logo_path && (
              <PreloadImage
                src={`https://image.tmdb.org/t/p/original${data.logo_path}`}
                alt={data.title || data.name}
                className="max-h-20 sm:max-h-32 w-auto mb-3 sm:mb-4"
              />
            )}

            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs sm:text-sm">
              <span>
                {(() => {
                  const dateStr = data.release_date || data.first_air_date;
                  if (!dateStr) return "N/A";
                  const year = new Date(dateStr).getFullYear();
                  return isNaN(year) ? "N/A" : year;
                })()}
              </span>
              {data.adult !== undefined && (
                <span className="border px-1 sm:px-2 py-0.5 text-[10px] sm:text-sm rounded">
                  {data.adult ? "18+" : "PG-13"}
                </span>
              )}
            </div>

            <p className="text-[12px] sm:text-sm leading-relaxed sm:leading-relaxed">
              {truncateText(data.overview, 250)}
            </p>

            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-5">
              <button className="px-4 sm:px-6 py-1 sm:py-2 bg-white text-black font-bold rounded flex items-center gap-1 sm:gap-2 hover:bg-zinc-300 text-xs sm:text-sm">
                ▶ Watch Now
              </button>
              <button className="px-3 sm:px-4 py-1 sm:py-2 bg-zinc-800 text-white rounded flex items-center gap-1 sm:gap-2 hover:bg-zinc-700 text-xs sm:text-sm">
                <FaInfoCircle />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {ids.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to item ${i + 1}`}
            className="w-5 h-5 rounded-full relative flex items-center justify-center"
            onClick={() => setCurrentIndex(i)}
          >
            {i === currentIndex ? (
              <svg className="w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="7"
                  stroke="#3f3f46"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="7"
                  stroke="white"
                  strokeWidth="3.5"
                  fill="transparent"
                  strokeDasharray={44}
                  strokeDashoffset={44 - (progress / 100) * 44}
                  style={{ transition: "stroke-dashoffset 0.1s linear" }}
                />
              </svg>
            ) : (
              <span className="w-3 h-3 bg-zinc-600 rounded-full block"></span>
            )}
          </button>
        ))}
      </div>

      {/* Volume button */}
      {trailers[currentIndex] && isVideoReady && isLargeScreen && (
        <button
          onClick={handleMuteToggle}
          aria-label="Toggle mute"
          className="absolute bottom-12 sm:bottom-24 right-5 sm:right-10 text-white p-2 sm:p-3 rounded flex hover:bg-zinc-700 transition-colors"
        >
          {isMuted ? (
            <FaVolumeMute className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <FaVolumeUp className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </button>
      )}
    </section>
  );
};
