import { Star } from "lucide-react";
import { parseToPercentage } from "../../helpers/ratings";

interface Props {
  value: string;
}

export const RatingStars = ({ value }: Props) => {
  const percentage = parseToPercentage(value);
  const stars = (percentage / 100) * 5;
  const roundedStars = Math.round(stars * 2) / 2;
  const fullStars = Math.floor(roundedStars);
  const hasHalfStar = roundedStars % 1 !== 0;

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />;
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
