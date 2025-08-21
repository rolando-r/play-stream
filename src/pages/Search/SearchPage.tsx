import { useSearch } from "../../hooks/useSearch";
import { SearchBar } from "../../components/";
import { SearchResults } from "../../components/";

export const SearchPage = () => {
  const { query, setQuery, inputRef, results, loading } = useSearch();

  return (
    <div className="pt-20 pb-10">
      <SearchBar query={query} setQuery={setQuery} inputRef={inputRef} />
      <SearchResults results={results} loading={loading} />
    </div>
  );
};
