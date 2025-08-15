import { useRef, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useActiveIndicator = (menuItems: { path: string }[]) => {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties | null>(null);
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeIndex = menuItems.findIndex(
        (item) => item.path === location.pathname
      );
      const activeEl = menuRefs.current[activeIndex];
      if (activeEl) {
        setIndicatorStyle({
          width: activeEl.offsetWidth,
          left: activeEl.offsetLeft,
        });
      }
    };

    updateIndicator();
    window.addEventListener("load", updateIndicator);
    return () => window.removeEventListener("load", updateIndicator);
  }, [location.pathname, menuItems]);

  return { indicatorStyle, menuRefs, location };
};
