import { useMediaInformation } from "../../hooks/useMediaInformation";
import { getRuntimeText } from "../../helpers/runtime";
import { RatingStars } from "./RatingStars";
import { SkeletonInfo } from "./SkeletonInfo";

interface Props {
  mediaId: number;
  mediaType: "movie" | "tv";
}

export const Information = ({ mediaId, mediaType }: Props) => {
  const { tmdbData, omdbData, loading } = useMediaInformation(mediaId, mediaType);

  const omdbFields: { key: string; label: string }[] = [
    { key: "Director", label: "Director" },
    { key: "Writer", label: "Writer" },
    { key: "Actors", label: "Actors" },
    { key: "Language", label: "Language" },
    { key: "Country", label: "Country" },
    { key: "Awards", label: "Awards" },
  ];

  if (loading) return <SkeletonInfo />;

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
                <span className="text-yellow-400 font-semibold">{rating.Value}</span>
                <RatingStars value={rating.Value} />
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
