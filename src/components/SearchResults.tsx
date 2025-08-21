import { SearchCard } from "./SearchCard";

type Props = {
  results: any[];
  loading: boolean;
};

export const SearchResults = ({ results, loading }: Props) => {
  if (loading && results.length === 0) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }
  if (!loading && results.length === 0) {
    return <p className="text-center text-gray-400">No results found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {results.map((item) => (
        <SearchCard key={item.id} item={item} />
      ))}
    </div>
  );
};
