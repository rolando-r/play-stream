import type { FC } from "react";
import { Link } from "react-router-dom";
import type { MediaItem } from "../../types/MediaItem";

interface Props {
  item: MediaItem;
}

export const CarouselItem: FC<Props> = ({ item }) => {
  const isMovie = !!item.title;
  const route = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;

  return (
    <Link to={route}>
      <div className="min-w-[150px] md:min-w-[200px] cursor-pointer overflow-hidden rounded-lg">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title || item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    </Link>
  );
};
