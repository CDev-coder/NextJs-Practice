// context/FilterContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types";

interface FilterContextType {
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  currentFilter: string;
  setCurrentFilter: (filter: string) => void;
  activeFilters: {
    property: keyof Product;
    values: string[];
  } | null;
  setActiveFilters: (
    filters: {
      property: keyof Product;
      values: string[];
    } | null
  ) => void;
  selectedFilterValue: string | null;
  setSelectedFilterValue: (value: string | null) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({
  children,
  products,
}: {
  children: ReactNode;
  products: Product[];
}) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentFilter, setCurrentFilter] = useState("All Products");
  const [activeFilters, setActiveFilters] = useState<{
    property: keyof Product;
    values: string[];
  } | null>(null);
  const [selectedFilterValue, setSelectedFilterValue] = useState<string | null>(
    null
  );

  const resetFilters = () => {
    setFilteredProducts(products);
    setCurrentFilter("All Products");
    setActiveFilters(null);
    setSelectedFilterValue(null);
  };

  return (
    <FilterContext.Provider
      value={{
        filteredProducts,
        setFilteredProducts,
        currentFilter,
        setCurrentFilter,
        activeFilters,
        setActiveFilters,
        selectedFilterValue,
        setSelectedFilterValue,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
