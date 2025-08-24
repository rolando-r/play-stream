import { useEffect, useState } from "react";
import { getDetailsWithLogos } from "../services/tmdbApi";
import { getOmdbInfo } from "../services/omdbApi";
import { Star } from "lucide-react";

interface Props {
  mediaId: number;
  mediaType: "movie" | "tv";
}

export const Information = ({ mediaId, mediaType }: Props) => {
  const [tmdbData, setTmdbData] = useState<any>(null);
  const [omdbData, setOmdbData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const tmdb = await getDetailsWithLogos(mediaId, mediaType);
      if (!tmdb) return;

      const omdb = tmdb.item.imdb_id
        ? await getOmdbInfo(tmdb.item.imdb_id)
        : null;

      setTmdbData(tmdb.item);
      setOmdbData(omdb);
      setLoading(false);
    };
    fetchData();
  }, [mediaId, mediaType]);

  const parseToPercentage = (value: string) => {
    if (value.includes("%")) return parseFloat(value.replace("%", ""));
    if (value.includes("/100")) return parseFloat(value.split("/")[0]);
    if (value.includes("/10")) return parseFloat(value.split("/")[0]) * 10;
    return 0;
  };

  const renderStars = (value: string) => {
    const percentage = parseToPercentage(value);
    const stars = (percentage / 100) * 5;
    const roundedStars = Math.round(stars * 2) / 2;
    const fullStars = Math.floor(roundedStars);
    const hasHalfStar = roundedStars % 1 !== 0;

    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative w-4 h-4">
                <Star className="w-4 h-4 text-gray-600" />
                <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            );
          } else {
            return <Star key={i} className="w-4 h-4 text-gray-600" />;
          }
        })}
      </div>
    );
  };

  const getRuntimeText = (tmdbData: any) => {
    if (tmdbData.runtime) {
      return `${tmdbData.runtime} min`;
    }

    if (
      Array.isArray(tmdbData.episode_run_time) &&
      tmdbData.episode_run_time.length > 0
    ) {
      const runtimes = tmdbData.episode_run_time;
      if (runtimes.length === 1) {
        return `${runtimes[0]} min per episode`;
      } else {
        return `${Math.min(...runtimes)}–${Math.max(
          ...runtimes
        )} min per episode`;
      }
    }

    return null;
  };

  const omdbFields: { key: string; label: string }[] = [
    { key: "Director", label: "Director" },
    { key: "Writer", label: "Writer" },
    { key: "Actors", label: "Actors" },
    { key: "Language", label: "Language" },
    { key: "Country", label: "Country" },
    { key: "Awards", label: "Awards" },
  ];

  if (loading) {
    return (
      <div className="space-y-3 pl-6 min-h-[500px]">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="w-28 h-3 bg-gray-700 rounded animate-pulse" />
            <div className="w-56 h-4 bg-gray-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 pl-6 text-sm leading-relaxed">
      <div>
        <h3 className="font-semibold text-gray-200">Title</h3>
        <p>{tmdbData.title || tmdbData.name}</p>
      </div>

      {(tmdbData.release_date || tmdbData.first_air_date) && (
        <div>
          <h3 className="font-semibold text-gray-200">Release Date</h3>
          <p>{tmdbData.release_date || tmdbData.first_air_date}</p>
        </div>
      )}

      {getRuntimeText(tmdbData) && (
        <div>
          <h3 className="font-semibold text-gray-200">Runtime</h3>
          <p>{getRuntimeText(tmdbData)}</p>
        </div>
      )}

      {tmdbData.genres?.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-200">Genres</h3>
          <p>{tmdbData.genres.map((g: any) => g.name).join(", ")}</p>
        </div>
      )}

      {omdbData?.Ratings?.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-200">Ratings</h3>
          <ul className="space-y-1">
            {omdbData.Ratings.map((rating: any, idx: number) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="font-medium">{rating.Source}:</span>
                <span className="text-yellow-400 font-semibold">
                  {rating.Value}
                </span>
                {renderStars(rating.Value)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {omdbData &&
        omdbFields.map(
          ({ key, label }) =>
            omdbData[key] &&
            omdbData[key] !== "N/A" && (
              <div key={key}>
                <h3 className="font-semibold text-gray-200">{label}</h3>
                <p>{omdbData[key]}</p>
              </div>
            )
        )}
    </div>
  );
};
