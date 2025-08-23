import type { FC } from "react";
import { Link } from "react-router-dom";
import type { MediaItem } from "../../types/MediaItem";

interface Props {
  item: MediaItem;
  index: number;
}

export const Top10CarouselItem: FC<Props> = ({ item, index }) => {
  const isMovie = !!item.title;
  const route = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;
  const rank = index + 1;

  return (
    <Link to={route} className="relative group/item">
      <div className="min-w-[120px] md:min-w-[150px] cursor-pointer overflow-visible relative flex justify-center">
        <span
          className="
            absolute left-0 bottom-4 -translate-x-[60%]
            text-[80px] md:text-[100px] font-extrabold
            text-white/20 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]
            select-none z-0
            transition-transform duration-300
            group-hover/item:scale-105 group-hover/item:text-white/30
          "
        >
          {rank}
        </span>

        <div className="relative z-10 w-[100px] md:w-[140px] rounded-lg overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.name}
            className="
              w-full h-full object-cover
              transition-transform duration-300
              group-hover/item:scale-105
            "
          />
        </div>
      </div>
    </Link>
  );
};
