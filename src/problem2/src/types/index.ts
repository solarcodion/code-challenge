export interface Token {
  name: string;
  symbol: string;
  price?: number;
  iconUrl: string;
}

export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

export interface SwapFormData {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
}
