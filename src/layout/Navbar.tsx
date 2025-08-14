import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav
            className={`
                fixed top-0 left-0 w-full flex justify-center
                transition-colors duration-300 ease-in-out p-2
            `}
            style={{ zIndex: 1000 }}
        >
            <div
                className={`
                    flex flex-nowrap items-center pl-6 sm:pl-8 md:pl-10 px-4 py-2
                    space-x-4 rounded-full
                    transition-all duration-300 ease-in-out transform
                    text-xs sm:text-sm md:text-base
                `}
            >
                {/* Logo como imagen */}
                <Link to="/">
                    <img
                        src="/logo.webp"
                        alt="FilmHub"
                        className="max-h-20 w-auto object-contain"
                    />
                </Link>

                {/* Enlaces */}
                <Link to="/" className="hover:underline">
                    Home
                </Link>
                <Link to="/series" className="hover:underline">
                    Series
                </Link>
                <Link to="/movies" className="hover:underline">
                    Movies
                </Link>
                <Link to="/movies" className="hover:underline">
                    Anime
                </Link>

                <Link to="/">
                    <img
                        src="/search.svg"
                        alt="search"
                        className="h-6 w-6 object-contain"
                    />
                </Link>
            </div>
        </nav>
    );
};
