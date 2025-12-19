"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, ActiveFilters } from "../types";
import { capitalizeFirst } from "./helperFunctions";

interface FilterContextType {
  filteredProducts: Product[];
  currentFilter: string;
  activeFilters: ActiveFilters | null;
  baseProducts: Product[];
  applyFilter: (category: string, animal: string, subcategory: string) => void;
  removeFilter: () => void;
  resetFilters: () => void;
  sort_Alphabetically: (order: string) => void;
  sort_PricePoint: (order: string) => void;
  sort_PriceRange: (order: number[]) => void;
  sort_Ratings: (order: number) => void;
  sort_ByField: <K extends keyof Product>(field: K, value: Product[K]) => void;
  setSelectedFilterValue: (value: string | null) => void;
  selectedFilterValue: string | null;
  currentAnimal: string;
  currentCategory: string;
  currentSubcategory: string;
  setDisplayProducts: (product: Product[]) => void;
  searched_Brand: string[];
  searched_Animal: string[];
  searched_Names: string[];
  searched_Prices: string[];
  setFallbackMessage: (msg: string | null) => void;
  fallbackMessage: string | null;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({
  children,
  products,
}: {
  children: ReactNode;
  products: Product[];
}) {
  const [baseProducts] = useState<Product[]>(products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [displayProducts, setDisplayProducts] = useState<Product[]>(products);
  const [currentFilter, setCurrentFilter] = useState("All Products");

  const [activeFilters, setActiveFilters] = useState<ActiveFilters | null>(
    null
  );
  const [selectedFilterValue, setSelectedFilterValue] = useState<string | null>(
    null
  );

  const [currentAnimal, setCurrentAnimal] = useState("All");
  const [currentCategory, setCurrentCatetory] = useState("All Products");
  const [currentSubcategory, setCurrentSubcategory] = useState("All");

  // States for search suggestions
  const [searched_Brand, setSearchedBrand] = useState<string[]>([]);
  const [searched_Animal, setSearchedAnimal] = useState<string[]>([]);
  const [searched_Names, setSearchedNames] = useState<string[]>([]);
  const [searched_Prices, setSearchedPrices] = useState<string[]>([]);

  ///Fall back message
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);

  // Helper to update the searched_* arrays
  const updateSearchOptions = (productsToUse: Product[]) => {
    setSearchedNames([...new Set(productsToUse.map((p) => p.name))].sort());
    setSearchedBrand([...new Set(productsToUse.map((p) => p.brand))].sort());
    setSearchedAnimal([...new Set(productsToUse.map((p) => p.animal))].sort());
    setSearchedPrices(
      [...new Set(productsToUse.map((p) => p.price.toString()))].sort()
    );
  };

  const applyFilter = (
    category: string = "all",
    animal: string = "all",
    subcategory: string = "all",
    brand?: string // optional for future expansion
  ) => {
    // Always filter from baseProducts
    const newFilteredProducts = baseProducts.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (animal !== "all" && product.animal !== animal) return false;
      if (subcategory !== "all" && product.subcategory !== subcategory)
        return false;
      if (brand && product.brand !== brand) return false;
      return true;
    });

    // Update state
    setFilteredProducts(newFilteredProducts);
    setDisplayProducts(newFilteredProducts);
    setCurrentCatetory(category);
    setCurrentAnimal(animal);
    setCurrentSubcategory(subcategory);
    setSelectedFilterValue(subcategory);

    // Update suggestion/search arrays
    setSearchedBrand([...new Set(newFilteredProducts.map((p) => p.brand))]);
    setSearchedAnimal([...new Set(newFilteredProducts.map((p) => p.animal))]);
    setSearchedNames([...new Set(newFilteredProducts.map((p) => p.name))]);
    setSearchedPrices([
      ...new Set(newFilteredProducts.map((p) => String(p.price))),
    ]);

    const filtered_brands = [
      ...new Set(newFilteredProducts.map((p) => p.brand)),
    ].sort();
    const filtered_animals = [
      ...new Set(newFilteredProducts.map((p) => p.animal)),
    ].sort();
    const filtered_subcategories = [
      ...new Set(newFilteredProducts.map((p) => p.subcategory)),
    ].sort();
    const filtered_names = [
      ...new Set(newFilteredProducts.map((p) => p.name)),
    ].sort();

    setCurrentFilter(
      `${capitalizeFirst(category)} / ${capitalizeFirst(animal)}`
    );

    setActiveFilters({
      category,
      animal,
      subcategory,
      results: newFilteredProducts,
      filtered_prices: newFilteredProducts.map((p) => p.price),
      filtered_ratings: newFilteredProducts.map((p) => p.rating),
      filtered_sales: newFilteredProducts.map((p) => p.salesVolume),
      filtered_brands,
      filtered_subcategories,
      filtered_animals,
      filtered_names,
    });
  };

  const resetFilters = () => {
    setFilteredProducts(baseProducts);
    setDisplayProducts(baseProducts);
    setCurrentCatetory("All Products");
    setCurrentAnimal("All");
    setCurrentSubcategory("All");
    setCurrentFilter("All Products");
    setActiveFilters(null);
    setSelectedFilterValue(null);

    // Update search suggestions for all products
    updateSearchOptions(baseProducts);
  };

  const value: FilterContextType = {
    filteredProducts: displayProducts,
    setFallbackMessage,
    fallbackMessage,
    baseProducts,
    currentFilter,
    activeFilters,
    applyFilter,
    removeFilter: () => resetFilters(),
    resetFilters,
    setDisplayProducts,
    sort_Alphabetically: (order: string) => {
      const sorted = [...displayProducts].sort((a, b) =>
        order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      setDisplayProducts(sorted);
    },
    sort_PricePoint: (order: string) => {
      const sorted = [...displayProducts].sort((a, b) =>
        order === "low"
          ? (a.price || 0) - (b.price || 0)
          : (b.price || 0) - (a.price || 0)
      );
      setDisplayProducts(sorted);
    },
    sort_PriceRange: (order: number[]) => {
      const priceSet = new Set(order);
      setDisplayProducts(displayProducts.filter((p) => priceSet.has(p.price)));
    },
    sort_Ratings: (rating: number) => {
      setDisplayProducts(displayProducts.filter((p) => p.rating === rating));
    },
    sort_ByField: <K extends keyof Product>(field: K, value: Product[K]) => {
      setDisplayProducts(displayProducts.filter((p) => p[field] === value));
    },
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
  if (!context)
    throw new Error("useFilters must be used within a FilterProvider");
  return context;
}
