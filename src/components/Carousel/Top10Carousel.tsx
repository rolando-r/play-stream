import type { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Top10CarouselItem } from "./Top10CarouselItem";
import type { MediaItem } from "../../types/MediaItem";
import { useCarouselScroll } from "../../hooks/";

interface Top10CarouselProps {
  title: string;
  items: MediaItem[];
}

export const Top10Carousel: FC<Top10CarouselProps> = ({ title, items }) => {
  const { scrollRef, canScrollLeft, canScrollRight, scroll } =
    useCarouselScroll<HTMLDivElement>(items);

  return (
    <div className="mb-12 relative group">
      <h2 className="text-white text-xl font-semibold mb-4 px-10 md:px-10">
        {title}
      </h2>

      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 h-full flex items-center justify-center 
                     z-20 p-3 bg-black/50 hover:bg-black/70 text-white
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FaChevronLeft />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-16 overflow-x-auto px-20 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.slice(0, 10).map((item, index) => (
          <Top10CarouselItem key={item.id} item={item} index={index} />
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 h-full flex items-center justify-center 
                     z-20 p-3 bg-black/50 hover:bg-black/70 text-white
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};
