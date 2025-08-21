import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useCarouselScroll = <T extends HTMLElement>(items: any[]) => {
  const scrollRef = useRef<T>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { pathname } = useLocation();

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    const handleResize = () => updateScrollButtons();

    ref.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", handleResize);

    const timeout = setTimeout(updateScrollButtons, 100);

    return () => {
      ref.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [items]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setCanScrollLeft(false);
      setCanScrollRight(true);
    }
  }, [pathname]);

  return { scrollRef, canScrollLeft, canScrollRight, scroll };
};
