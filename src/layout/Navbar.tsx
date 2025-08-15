import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 w-full flex justify-center p-2 transition-colors duration-300 ease-in-out"
      style={{ zIndex: 1000 }}
    >
      <div
        className="
          flex items-center justify-between py-2 rounded-full
          text-[10px] sm:text-sm md:text-base w-full max-w-[95%] mx-auto
        "
      >
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
        <div className="flex space-x-2 sm:space-x-4 font-bold">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/series" className="hover:underline">
            Series
          </Link>
          <Link to="/movies" className="hover:underline">
            Movies
          </Link>
          <Link to="/anime" className="hover:underline">
            Anime
          </Link>
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
