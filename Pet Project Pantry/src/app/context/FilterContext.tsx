// context/FilterContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { Product, ActiveFilters } from "../types";
import { capitalizeFirst } from "./helperFunctions";

interface FilterContextType {
  filteredProducts: Product[];
  currentFilter: string;
  activeFilters: ActiveFilters | null;

  applyFilter: (category: string, animal: string, subcategory: string) => void;
  removeFilter: () => void;
  resetFilters: () => void;
  sort_Alphabetically: (order: string) => void;
  sort_PricePoint: (order: string) => void;
  sort_PriceRange: (order: number[]) => void;
  sort_ByField: <K extends keyof Product>(field: K, value: Product[K]) => void;
  setSelectedFilterValue: (value: string | null) => void;
  selectedFilterValue: string | null;
  // Additional state for tracking animal and subcategory
  currentAnimal: string;
  currentCategory: string;
  currentSubcategory: string;

  searched_Brand: string[];
  searched_Animal: string[];
  searched_Names: string[];
  searched_Prices: string[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({
  children,
  products,
}: {
  children: ReactNode;
  products: Product[];
}) {
  // Store the base products array
  const [baseProducts] = useState<Product[]>(products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [displayProducts, setDisplayProducts] = useState<Product[]>(products);
  const [currentFilter, setCurrentFilter] = useState("All Products");

  const [availableFilters, setAvailableFilters] = useState<string[]>([]);

  const [searched_Brand, setSearchedBrand] = useState<string[]>([]);
  const [searched_Animal, setSearchedAnimal] = useState<string[]>([]);
  const [searched_Names, setSearchedNames] = useState<string[]>([]);
  const [searched_Prices, setSearchedPrices] = useState<string[]>([]);

  const [activeFilters, setActiveFilters] = useState<ActiveFilters | null>(
    null
  );

  const [selectedFilterValue, setSelectedFilterValue] = useState<string | null>(
    null
  );

  // Additional state for animal and subcategory
  const [currentAnimal, setCurrentAnimal] = useState("All");
  const [currentCategory, setCurrentCatetory] = useState("All Products");
  const [currentSubcategory, setCurrentSubcategory] = useState("All");

  // Apply a new filter (always works from base products)
  const applyFilter = (
    category: string,
    animal: string,
    subcategory: string
  ) => {
    const newFilteredProducts = products.filter((product) => {
      // Only apply category filter if it's not "all"
      if (category !== "all" && product.category !== category) return false;

      // Only apply animal filter if it's not "all"
      if (animal !== "all" && product.animal !== animal) return false;

      // Only apply subcategory filter if it's not "all"
      if (subcategory !== "all" && product.subcategory !== subcategory)
        return false;

      // If all non-"all" filters pass, include the product
      return true;
    });
    setFilteredProducts(newFilteredProducts);
    setDisplayProducts(newFilteredProducts);
    setCurrentCatetory(category);
    setSelectedFilterValue(subcategory);
    setCurrentAnimal(animal);

    // Extract and sort the properties you want
    const filtered_brands = [
      ...new Set(newFilteredProducts.map((product) => product.brand)),
    ].sort();
    const filtered_animalTypes = [
      ...new Set(newFilteredProducts.map((product) => product.animal)),
    ].sort();
    const filtered_prices = newFilteredProducts.map((product) => product.price);
    const filtered_names = newFilteredProducts
      .map((product) => product.name)
      .sort();
    const filtered_subcategoryFitlered = [
      ...new Set(newFilteredProducts.map((product) => product.subcategory)),
    ].sort();

    setCurrentFilter(
      capitalizeFirst(category) + " / " + capitalizeFirst(animal) + " "
    );

    setActiveFilters({
      category,
      animal,
      subcategory,
      results: newFilteredProducts,
      filtered_prices: filtered_prices,
      filtered_brands: filtered_brands,
      filtered_subcategories: filtered_subcategoryFitlered,
      filtered_animals: filtered_animalTypes,
      filtered_names: filtered_names,
    });
  };

  const sort_Alphabetically = (order: string) => {
    console.log("sort_Alphabetically");
    const sortProductsByName = (products: Product[], order: string) => {
      return [...products].sort((a, b) => {
        if (order === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    };
    const sortedProducts = sortProductsByName(filteredProducts, order);
    setDisplayProducts(sortedProducts);
  };

  const sort_PricePoint = (order: string) => {
    console.log("sort_PricePoint - Order:", order);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      // Handle potential undefined or null prices
      const priceA = a.price || 0;
      const priceB = b.price || 0;

      if (order === "low") {
        return priceA - priceB; // Ascending: low to high
      } else {
        return priceB - priceA; // Descending: high to low
      }
    });

    setDisplayProducts(sortedProducts);
  };

  const sort_PriceRange = (order: number[]) => {
    console.log("sort_Price");
    console.log("filteredProducts: ", filteredProducts);
    console.log("Price Order: ", order);
    const filterProductsByPrices = (
      products: Product[],
      priceArray: number[]
    ) => {
      const priceSet = new Set(priceArray);
      return products.filter((product) => priceSet.has(product.price));
    };
    const sortedProducts = filterProductsByPrices(filteredProducts, order);
    setDisplayProducts(sortedProducts);
  };

  const sort_ByField = <K extends keyof Product>(
    field: K,
    value: Product[K]
  ) => {
    console.log(`Filtering by ${String(field)} = ${value}`);

    const filtered = filteredProducts.filter(
      (product) => product[field] === value
    );

    setDisplayProducts(filtered);
  };

  const getAvailableFilters = () => {};

  // Remove a filter (reset to show all products)
  const removeFilter = () => {
    if (activeFilters) {
      setFilteredProducts(baseProducts);
      setDisplayProducts(baseProducts);
      setCurrentFilter("All Products");
      setActiveFilters(null);
    }
  };

  const resetFilters = () => {
    setFilteredProducts(baseProducts);
    setDisplayProducts(baseProducts);
    setCurrentFilter("All Products");
    setCurrentCatetory("All Products");
    setCurrentAnimal("All");
    setCurrentSubcategory("All");
    setActiveFilters(null);
    setSelectedFilterValue(null);
  };

  const value = {
    filteredProducts: displayProducts,
    currentFilter,
    activeFilters,
    applyFilter,
    removeFilter,
    sort_Alphabetically,
    sort_PricePoint,
    sort_PriceRange,
    sort_ByField,
    resetFilters,
    setSelectedFilterValue,
    selectedFilterValue,
    currentAnimal,
    currentCategory,
    currentSubcategory,
    searched_Brand,
    searched_Animal,
    searched_Names,
    searched_Prices,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
