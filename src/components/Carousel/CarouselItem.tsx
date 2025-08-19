import type { FC } from "react";
import type { MediaItem } from "../../types/MediaItem";

interface Props {
  item: MediaItem;
}

export const CarouselItem: FC<Props> = ({ item }) => {
  return (
    <div className="min-w-[150px] md:min-w-[200px] cursor-pointer overflow-hidden rounded-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.title || item.name}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
      <p className="text-white text-sm mt-2 truncate">
        {item.title || item.name}
      </p>
    </div>
  );
};
