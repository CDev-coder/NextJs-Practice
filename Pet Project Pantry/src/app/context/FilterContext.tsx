// context/FilterContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { Product } from "../types";

// Define a more appropriate interface for your active filters
interface ActiveFilters {
  category: string;
  animal: string;
  subcategory: string;
  results: Product[];
}

interface FilterContextType {
  filteredProducts: Product[];
  currentFilter: string;
  activeFilters: ActiveFilters | null;

  applyFilter: (category: string, animal: string, subcategory: string) => void;
  removeFilter: () => void;
  resetFilters: () => void;
  setSelectedFilterValue: (value: string | null) => void;
  selectedFilterValue: string | null;
  // Additional state for tracking animal and subcategory
  currentAnimal: string;
  currentSubcategory: string;
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
  const [currentFilter, setCurrentFilter] = useState("All Products");
  const [availableFilters, setAvailableFilters] = useState<string[]>([]);

  const [activeFilters, setActiveFilters] = useState<{
    category: string;
    animal: string;
    subcategory: string;
    results: Product[];
  } | null>(null);

  const [selectedFilterValue, setSelectedFilterValue] = useState<string | null>(
    null
  );

  // Additional state for animal and subcategory
  const [currentAnimal, setCurrentAnimal] = useState("All");
  const [currentSubcategory, setCurrentSubcategory] = useState("All");

  const capitalizeFirst = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
      if (animal !== "all" && product.animalType !== animal) return false;

      // Only apply subcategory filter if it's not "all"
      if (subcategory !== "all" && product.subcategory !== subcategory)
        return false;

      // If all non-"all" filters pass, include the product
      return true;
    });

    console.log("ApplyFilter newFilteredProducts: ", newFilteredProducts);
    console.log("ApplyFilter subcategory: ", subcategory);
    setSelectedFilterValue(subcategory);
    setFilteredProducts(newFilteredProducts);

    // Extract and sort the properties you want
    const brands = [
      ...new Set(newFilteredProducts.map((product) => product.brand)),
    ].sort();
    const animalTypes = [
      ...new Set(newFilteredProducts.map((product) => product.animalType)),
    ].sort();
    const prices = newFilteredProducts.map((product) => product.price);
    const names = newFilteredProducts.map((product) => product.name).sort();
    // Or create an array of objects with the specific structure
    const structuredData = newFilteredProducts
      .map((product) => ({
        brand: product.brand,
        animalType: product.animalType,
        price: product.price,
        name: product.name,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort by name alphabetically

    console.log("Brands:", brands);
    console.log("Animal Types:", animalTypes);
    console.log("Prices:", prices);
    console.log("Names (sorted):", names);
    console.log("Structured Data:", structuredData);

    setCurrentFilter(
      capitalizeFirst(category) + " / " + capitalizeFirst(animal) + " "
    );
    setActiveFilters({
      category,
      animal,
      subcategory,
      results: newFilteredProducts,
    });
  };

  const getAvailableFilters = () => {};

  // Remove a filter (reset to show all products)
  const removeFilter = () => {
    if (activeFilters) {
      setFilteredProducts(baseProducts);
      setCurrentFilter("All Products");
      setActiveFilters(null);
    }
  };

  const resetFilters = () => {
    setFilteredProducts(baseProducts);
    setCurrentFilter("All Products");
    setActiveFilters(null);
    setSelectedFilterValue(null);
  };

  const value = {
    filteredProducts,
    currentFilter,
    activeFilters,
    applyFilter,
    removeFilter,
    resetFilters,
    setSelectedFilterValue,
    selectedFilterValue,
    currentAnimal,
    currentSubcategory,
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
