export interface StoreOffer {
  name: string;
  type: "local" | "international";
  price: number;
  currency: string;
  shippingCost: number;
  deliveryTime: string;
  reliabilityRating: number;
  url?: string;
  notes: string;
}

export interface SwotData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface SeasonalTips {
  typicalSaleSeasons: string[];
  recommendedTargetPrice: number;
  advice: string;
}

export interface SearchResult {
  productTitle: string;
  stores: StoreOffer[];
  swot: SwotData;
  seasonalTips: SeasonalTips;
  citations?: { title: string; uri: string }[];
  searchSuggestions?: string[];
}

export interface WatchedItem {
  id: string;
  name: string;
  targetPrice: number;
  currentPrice: number;
  currency: string;
  country: string;
  bestStore: string;
  storeUrl?: string;
  lastChecked: string;
  triggered: boolean;
  alertMessage?: string;
}

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currency: string;
}
