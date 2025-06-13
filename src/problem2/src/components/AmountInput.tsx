import type { ChangeEvent } from "react";
import type { Token } from "../types";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  token: Token | null;
  label: string;
  readOnly?: boolean;
  error?: string;
}

export default function AmountInput({
  value,
  onChange,
  token,
  label,
  readOnly = false,
  error,
}: AmountInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow numbers and decimals
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
      <div className={`relative ${error ? "mb-1" : "mb-4"}`}>
        <input
          type="text"
          className={`input-field pl-3 py-1 pr-24 rounded-lg ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:border-accent"
          } ${
            readOnly
              ? "bg-gray-800/50 cursor-not-allowed select-none"
              : "bg-gray-800/30 hover:bg-gray-800/50"
          }`}
          placeholder="0.00"
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
          style={{ transition: "all 0.2s ease" }}
        />
        {token && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="flex items-center bg-gray-800 rounded-lg px-2 py-1">
              <img
                src={token.iconUrl}
                alt={token.symbol}
                className="w-5 h-5 mr-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/20x20/gray/white?text=" +
                    token.symbol.charAt(0);
                }}
              />
              <span className="text-sm font-medium">{token.symbol}</span>
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    </div>
  );
}
