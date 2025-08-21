import { useState, useEffect } from "react";
import { menuItems } from "../config/menuItems";
import { useActiveIndicator } from "../hooks";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { indicatorStyle, menuRefs, location } = useActiveIndicator(menuItems);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 200;
      setScrolled(isScrolled);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${
        scrolled ? "bg-black/70" : ""
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-black via-black/80 to-transparent"></div>
      <nav className="flex justify-center p-2">
        <div className="flex items-center justify-between py-2 w-full max-w-[95%] mx-auto">
          {/* Logo */}
          <div className="flex justify-center items-center">
            <Link to="/">
              <img
                src="/logo.webp"
                alt="PlayStream"
                className="h-10 sm:h-14 md:h-16 object-contain"
              />
            </Link>
          </div>

          {/* Central Menu */}
          <div className="relative flex space-x-3 sm:space-x-6 font-bold text-sm sm:text-base">
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
            {indicatorStyle && (
              <span
                className="absolute bottom-0 h-[2px] bg-white transition-all duration-300 ease-in-out"
                style={indicatorStyle}
              />
            )}
          </div>

          {/* Search Icon */}
          <div className="flex justify-center items-center">
            <Link to="/search">
              <Search
                className="w-7 h-7"
                strokeWidth={location.pathname === "/search" ? 3 : 2}
                color={location.pathname === "/search" ? "#fff" : "#d1d5db"}
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
