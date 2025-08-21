import { Link } from "react-router-dom";

export const SearchCard = ({ item }: { item: any }) => (
  <Link
    key={item.id}
    to={`/${item.media_type === "movie" ? "movie" : "tv"}/${item.id}`}
    className="relative group"
  >
    <div className="relative aspect-[4/2] rounded-md">
      <div className="w-full h-full rounded-md overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
          alt={item.title || item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {item.logo_path && (
        <div className="absolute bottom-0 left-0 w-full flex justify-center bg-gradient-to-t from-black/70 via-black/40 to-transparent p-2">
          <img
            src={`https://image.tmdb.org/t/p/w300${item.logo_path}`}
            alt={`${item.title || item.name} logo`}
            className="max-h-6 sm:max-h-8 md:max-h-10 object-contain"
          />
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -inset-1 border-1 border-white rounded-md"></div>
      </div>
    </div>

    <div className="mt-2 text-center text-white text-sm truncate">
      {item.title || item.name}
    </div>
  </Link>
);
