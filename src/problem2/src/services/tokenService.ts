import axios from "axios";
import type { Token, TokenPrice } from "../types";

const PRICES_URL = "https://interview.switcheo.com/prices.json";
const TOKEN_ICONS_BASE_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

export async function fetchTokenPrices(): Promise<TokenPrice[]> {
  try {
    const response = await axios.get(PRICES_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return [];
  }
}

export async function getTokensWithPrices(): Promise<Token[]> {
  const prices = await fetchTokenPrices();

  // Create a map of currency to price
  const priceMap = new Map<string, number>();
  prices.forEach((item) => {
    priceMap.set(item.currency, item.price);
  });

  // Create tokens array with prices
  const tokens: Token[] = Array.from(priceMap.entries()).map(
    ([symbol, price]) => ({
      name: getTokenName(symbol),
      symbol,
      price,
      iconUrl: `${TOKEN_ICONS_BASE_URL}/${symbol}.svg`,
    })
  );

  return tokens.sort((a, b) => a.symbol.localeCompare(b.symbol));
}

function getTokenName(symbol: string): string {
  const tokenNames: Record<string, string> = {
    ETH: "Ethereum",
    BTC: "Bitcoin",
    USDC: "USD Coin",
    SWTH: "Switcheo",
    BUSD: "Binance USD",
    USDT: "Tether",
  };

  return tokenNames[symbol] || symbol;
}
