// types/index.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  animalType: string;
  category: string;
  subcategory: string;
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

// If you want to extend with more specific properties later
export interface ProductWithDetails extends Product {
  inStock?: boolean;
  rating?: number;
  brand?: string;
}
