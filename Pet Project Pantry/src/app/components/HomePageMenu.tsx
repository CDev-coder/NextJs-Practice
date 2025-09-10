// components/HomePageMenu.tsx
"use client";

import MainNavigation from "./MainNavigation";
import { useFilters } from "../context/FilterContext";
import ProductCard from "./ProductCard";
import { Product } from "../types";
import SideBarFilterMenu from "./SideBarFilterMenu";
import { useEffect, useState } from "react";

interface HomePageMenuProps {
  products: Product[];
}

const HomePageMenu = ({ products }: HomePageMenuProps) => {
  const {
    filteredProducts,
    setFilteredProducts,
    currentFilter,
    setCurrentFilter,
    activeFilters,
    setActiveFilters,
    selectedFilterValue,
    setSelectedFilterValue,
    resetFilters,
  } = useFilters();

  // Properties that can be used for filtering
  const filterableProperties: (keyof Product)[] = [
    "animalType",
    "category",
    "subcategory",
    "brand",
  ];

  const handleCategorySelect = (category: string) => {
    const filtered = products.filter((p) => p.category === category);
    setFilteredProducts(filtered);
    setCurrentFilter(category.charAt(0).toUpperCase() + category.slice(1));

    // Set up filter options for brands within this category
    const brands = Array.from(new Set(filtered.map((p) => p.brand)));
    setActiveFilters({
      property: "brand",
      values: brands,
    });
    setSelectedFilterValue(null);
  };

  const handleSubcategorySelect = (
    category: string,
    animal: string,
    subcategory: string
  ) => {
    const filtered = products.filter(
      (p) =>
        p.category === category &&
        p.animalType === animal &&
        p.subcategory === subcategory
    );

    setFilteredProducts(filtered);
    setCurrentFilter(
      `${
        animal.charAt(0).toUpperCase() + animal.slice(1)
      } ${subcategory} ${category}`
    );

    // Set up filter options for brands within this subcategory
    const brands = Array.from(new Set(filtered.map((p) => p.brand)));
    setActiveFilters({
      property: "brand",
      values: brands,
    });
    setSelectedFilterValue(null);
  };

  // Store the base filtered products (before property filters)
  const [baseFilteredProducts, setBaseFilteredProducts] =
    useState<Product[]>(products);

  const handlePropertyFilter = (property: keyof Product, value: string) => {
    console.log(
      "handlePropertyFilter-- property: " + property + " value: " + value
    );
    setSelectedFilterValue(value);
    if (value != "all") {
      // Filter from the base filtered products, not the already property-filtered products
      const filtered = baseFilteredProducts.filter(
        (p) => p[property] === value
      );
      console.log("filtered: ", filtered);
      setFilteredProducts(filtered);
    } else {
      const filtered = baseFilteredProducts.filter((p) => p[property]);
      console.log("filtered: ", filtered);
      setFilteredProducts(filtered);
    }
  };

  // Update baseFilteredProducts when category/subcategory changes
  useEffect(() => {
    setBaseFilteredProducts(filteredProducts);
  }, [currentFilter]); // Update when the main filter changes

  const getAvailableFilters = () => {
    const availableFilters: Partial<Record<keyof Product, string[]>> = {};

    filterableProperties.forEach((property) => {
      if (property !== activeFilters?.property) {
        // Use baseFilteredProducts for available filters to show all options
        const values = Array.from(
          new Set(baseFilteredProducts.map((p) => p[property]))
        );
        availableFilters[property] = values as string[];
      }
    });

    return availableFilters;
  };

  const clearFilters = () => {
    setFilteredProducts(products);
    setBaseFilteredProducts(products);
    setCurrentFilter("All Products");
    setActiveFilters(null);
    setSelectedFilterValue(null);
  };

  const availableFilters = getAvailableFilters();

  return (
    <div className="HomePageMenu">
      <MainNavigation
        onCategorySelect={handleCategorySelect}
        onSubcategorySelect={handleSubcategorySelect}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">Showing: {currentFilter}</span>
            {selectedFilterValue && (
              <span className="text-gray-600 mr-2">
                / {selectedFilterValue}
              </span>
            )}
            <button
              onClick={clearFilters}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Side navigation for filters */}
          <SideBarFilterMenu
            activeFilters={activeFilters}
            availableFilters={availableFilters}
            selectedFilterValue={selectedFilterValue}
            filteredProducts={filteredProducts}
            currentFilter={currentFilter}
            onSetSelectedFilterValue={setSelectedFilterValue}
            onSetActiveFilters={setActiveFilters}
            onHandlePropertyFilter={handlePropertyFilter}
            onHandleCategorySelect={handleCategorySelect}
          />
          {/* Product grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
              activeFilters || Object.keys(availableFilters).length > 0
                ? "flex-1"
                : "w-full"
            }`}
          >
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found for this selection.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-petflow-blue text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePageMenu;
