import { useState, useRef, useEffect } from "react";
import type { Token } from "../types";
import { FiChevronDown, FiSearch } from "react-icons/fi";

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: Token | null;
  onSelectToken: (token: Token) => void;
  label: string;
}

export default function TokenSelector({
  tokens,
  selectedToken,
  onSelectToken,
  label,
}: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
      <button
        type="button"
        className="flex items-center justify-between w-full input-field"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedToken ? (
          <div className="flex items-center">
            <img
              src={selectedToken.iconUrl}
              alt={selectedToken.symbol}
              className="w-6 h-6 mr-2"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/24x24/gray/white?text=" +
                  selectedToken.symbol.charAt(0);
              }}
            />
            <span>{selectedToken.symbol}</span>
          </div>
        ) : (
          <span className="text-gray-400">Select token</span>
        )}
        <FiChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-card rounded-lg shadow-lg border border-gray-700 max-h-80 overflow-auto">
          <div className="p-2 sticky top-0 bg-card border-b border-gray-700">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tokens"
                className="w-full pl-10 pr-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div className="py-1">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <button
                  key={token.symbol}
                  className="flex items-center w-full px-4 py-3 hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    onSelectToken(token);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <img
                    src={token.iconUrl}
                    alt={token.symbol}
                    className="w-6 h-6 mr-3"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/24x24/gray/white?text=" +
                        token.symbol.charAt(0);
                    }}
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{token.symbol}</span>
                    <span className="text-sm text-gray-400">{token.name}</span>
                  </div>
                  {token.price && (
                    <span className="ml-auto text-sm text-gray-300">
                      ${token.price.toFixed(2)}
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-400 text-center">
                No tokens found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
