// types/index.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  animal: string;
  category: string;
  subcategory: string;
  brand: string;
  SKU: string;
  rating: number;
  salesVolume: number;
}

export interface ActiveFilters {
  category: string;
  animal: string;
  subcategory: string;
  results: Product[];
  filtered_prices: number[];
  filtered_ratings: number[];
  filtered_sales: number[];
  filtered_brands: string[];
  filtered_subcategories: string[];
  filtered_animals: string[];
  filtered_names: string[];
}

// You can also create specific animal types if needed
export type AnimalType =
  | "dog"
  | "cat"
  | "bird"
  | "fish"
  | "reptile"
  | "small pet"
  | "all";

export type CategoryType = "food" | "accessories" | "treats" | "toys" | "all";
