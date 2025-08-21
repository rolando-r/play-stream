import { Search } from "lucide-react";

type Props = {
  query: string;
  setQuery: (val: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export const SearchBar = ({ query, setQuery, inputRef }: Props) => (
  <div className="px-4 mb-6">
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find movies, series and more"
        className="w-full pl-10 pr-4 py-3 rounded-md border border-black bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-600"
      />
    </div>
  </div>
);
