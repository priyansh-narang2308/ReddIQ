import { Search, Sparkles, Send } from "lucide-react";
import React, { JSX, useState } from "react";

const SearchComponent = ({
  handleSearch,
}: {
  handleSearch: (searchQuery: string) => void;
}): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const onSearchAction = () => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="p-4 bg-zinc-950 border-b border-zinc-800/50 relative overflow-hidden">
      <div
        className={`absolute -top-24 -left-24 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full transition-opacity duration-700 ${
          isFocused ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <div
          className={`relative flex items-center p-px rounded-2xl transition-all duration-500 bg-linear-to-r ${
            isFocused
              ? "from-orange-500/50 via-orange-400 to-orange-600/50 shadow-[0_0_25px_rgba(249,115,22,0.15)]"
              : "from-zinc-800 via-zinc-800/50 to-zinc-800"
          }`}
        >
          <div className="relative flex items-center w-full bg-zinc-900/90 backdrop-blur-xl rounded-[15px] overflow-hidden">
            <div className="pl-4 text-zinc-500">
              <Search
                className={`w-5 h-5 transition-all duration-300 ${
                  isFocused ? "text-orange-500 scale-110" : "scale-100"
                }`}
              />
            </div>

            <input
              type="text"
              className="flex-1 px-4 py-4 bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-600 text-sm font-medium"
              placeholder="Ask ReddIQ anything or search insights..."
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearchAction();
                }
              }}
            />

            <div className="pr-2 flex items-center">
              <button
                onClick={onSearchAction}
                className="flex items-center space-x-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all cursor-pointer duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-95 group"
              >
                <span className="text-xs uppercase tracking-wider hidden sm:inline">
                  Search
                </span>
                <Send className="w-4 h-4 " />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center space-x-4">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] flex items-center">
            <Sparkles className="w-3 h-3 mr-1.5 text-orange-500 animate-pulse" />
            AI-Powered Analysis
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
