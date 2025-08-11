import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                    ${scrolled
                        ? "backdrop-blur-md bg-white/70 dark:bg-gray-800/70 text-zinc-800 dark:text-zinc-100 shadow-md"
                        : "bg-zinc-100 text-zinc-800 dark:bg-gray-900 dark:text-zinc-100"
                    }
                `}
            >
                {/* Logo como imagen */}
                <Link to="/">
                    <img
                        src="/logo.webp"
                        alt="FilmHub"
                        className="max-h-5 w-auto object-contain"
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
            </div>
        </nav>
    );
};
