import { useState, useEffect } from "react";
import { getMovieDetailsWithLogos } from "../services/tmdbApi";
import { FaInfoCircle, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useScreenSize, useVideoZoom, useYouTubePlayer } from "../hooks/";

interface HeroBannerProps {
  movieId: number;
}

export const HeroBanner = ({ movieId }: HeroBannerProps) => {
  const [movieData, setMovieData] = useState<any>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const isLargeScreen = useScreenSize();
  const zoomFactor = useVideoZoom(isLargeScreen);
  const { playerRef, isVideoReady } = useYouTubePlayer(trailerKey, isLargeScreen);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovieDetailsWithLogos(movieId);
      if (data) {
        setMovieData(data.movie);
        if (isLargeScreen) setTrailerKey(data.trailerKey);
      }
    };
    fetchData();
  }, [movieId, isLargeScreen]);

  const handleMuteToggle = () => {
    if (playerRef.current) {
      if (isMuted) playerRef.current.unMute();
      else playerRef.current.mute();
      setIsMuted(!isMuted);
    }
  };

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        {movieData && (
          <img
            className="w-full h-full object-cover absolute top-0 left-0"
            src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
            alt={movieData.title}
            style={{
              opacity: isVideoReady ? 0 : 1,
              transition: "opacity 0.5s ease",
            }}
          />
        )}

        {trailerKey && isLargeScreen && (
          <div
            className="w-full h-full absolute top-0 left-0"
            style={{
              opacity: isVideoReady ? 1 : 0,
              transition: "opacity 0.5s ease",
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

      {/* Interface */}
      {movieData && (
        <div className="absolute bottom-12 sm:bottom-24 left-0 right-0 sm:left-10 sm:right-auto px-4 sm:px-0 text-white max-w-full sm:max-w-lg">
          {movieData.logo_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movieData.logo_path}`}
              alt={movieData.title}
              className="max-h-20 sm:max-h-32 w-auto mb-3 sm:mb-4"
            />
          )}
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs sm:text-sm">
            <span>{new Date(movieData.release_date).getFullYear()}</span>
            {movieData.adult !== undefined && (
              <span className="border px-1 sm:px-2 py-0.5 text-[10px] sm:text-sm rounded">
                {movieData.adult ? "18+" : "PG-13"}
              </span>
            )}
          </div>
          <p className="text-[12px] sm:text-sm leading-relaxed sm:leading-relaxed">
            {truncateText(movieData.overview, 250)}
          </p>
          <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-5">
            <button className="px-4 sm:px-6 py-1 sm:py-2 bg-white text-black font-bold rounded flex items-center gap-1 sm:gap-2 hover:bg-zinc-300 text-xs sm:text-sm">
              ▶ Watch Now
            </button>
            <button className="px-3 sm:px-4 py-1 sm:py-2 bg-zinc-800 text-white rounded flex items-center gap-1 sm:gap-2 hover:bg-zinc-700 text-xs sm:text-sm">
              <FaInfoCircle />
            </button>
          </div>
        </div>
      )}

      {/* Volume button */}
      {trailerKey && isVideoReady && isLargeScreen && (
        <button
          onClick={handleMuteToggle}
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
