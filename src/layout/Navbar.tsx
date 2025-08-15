import { Link, useLocation } from "react-router-dom";
import { useRef, useLayoutEffect, useState } from "react";

export const Navbar = () => {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties | null>(null);
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/series", label: "Series" },
    { path: "/movies", label: "Movies" },
    { path: "/anime", label: "Anime" },
  ];

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
  }, [location.pathname]);

  return (
    <nav
      className="fixed top-0 left-0 w-full flex justify-center p-2"
      style={{ zIndex: 1000 }}
    >
      <div className="flex items-center justify-between py-2 w-full max-w-[95%] mx-auto">
        {/* Logo */}
        <div className="w-20 flex justify-center items-center">
          <Link to="/">
            <img
              src="/logo.webp"
              alt="FilmHub"
              className="h-12 sm:h-16 object-contain"
            />
          </Link>
        </div>
        {/* Central Menu */}
        <div className="relative flex space-x-6 font-bold">
          {menuItems.map(({ path, label }, index) => (
            <Link
              key={path}
              to={path}
              ref={(el) => {
                menuRefs.current[index] = el;
              }}
              className={`pb-1 ${
                location.pathname === path
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
          {/* Sliding line */}
          {indicatorStyle && (
            <span
              className="absolute bottom-0 h-[2px] bg-white transition-all duration-300 ease-in-out"
              style={indicatorStyle}
            />
          )}
        </div>

        {/* Search Icon */}
        <div className="w-20 flex justify-center items-center">
          <Link to="/">
            <img
              src="/search.svg"
              alt="search"
              className="h-6 sm:h-8 object-contain"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};
