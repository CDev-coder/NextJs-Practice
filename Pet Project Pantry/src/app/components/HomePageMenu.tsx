// components/HomePageMenu.tsx
"use client";

import MainNavigation from "./MainNavigation";
import { useFilters } from "../context/FilterContext";
import ProductCard from "./ProductCard";
import { Product } from "../types";
import SideBarFilterMenu from "./SideBarFilterMenu";
import { useCallback, useEffect, useMemo, useState } from "react";
import { normalizeSubcategory } from "../context/normalizer";

interface HomePageMenuProps {
  products: Product[];
}

const HomePageMenu = ({ products }: HomePageMenuProps) => {
  const {
    applyFilter,
    filteredProducts,
    currentFilter,
    activeFilters,
    selectedFilterValue,
    resetFilters,
    searched_Brand,
    searched_Animal,
    searched_Names,
    searched_Prices,
  } = useFilters();

  // Properties that can be used for filtering
  const filterableProperties: (keyof Product)[] = [
    "animalType",
    "category",
    "subcategory",
    "brand",
  ];

  const handleCategorySelect = (
    category: keyof Product | string,
    animal: string,
    subcategory: keyof Product | string
  ) => {
    console.log("HomePageMenu handleCategorySelect - category: " + category);
    //const filtered = products.filter((p) => p.category === category);

    applyFilter(category, animal, subcategory);

    // Set up filter options for brands within this category
    /*
    const brands = Array.from(new Set(filtered.map((p) => p.brand)));
    setActiveFilters({
      property: "brand",
      values: brands,
    });
    setSelectedFilterValue(null);
    */
  };

  const handleSubcategorySelect = (
    category: string,
    animal: string,
    subcategory: string
  ) => {
    console.log("HPM handleSubcategorySelect");
    // Normalize the subcategory to match product data format
    const normalizedSubcategory = normalizeSubcategory(subcategory);

    const filtered = products.filter(
      (p) =>
        p.category === category &&
        p.animalType === animal &&
        p.subcategory === normalizedSubcategory
    );
    console.log("HPM handleSubcategorySelect filtered: ", filtered);
    applyFilter(category, animal, subcategory);
    /*
    setFilteredProducts(filtered);
    setCurrentFilter(
      `${
        animal.charAt(0).toUpperCase() + animal.slice(1)
      } ${subcategory} ${category}`
    );
    */
    // Set up filter options for brands within this subcategory
    const brands = Array.from(new Set(filtered.map((p) => p.brand)));
    console.log("HPM handleSubcategorySelect brands: ", brands);
    /*
    setActiveFilters({
      property: "brand",
      values: brands,
    });
    setSelectedFilterValue(null);
    */
  };

  // Memoize the base products to prevent unnecessary re-renders
  const baseFilteredProducts = useMemo(() => products, [products]);

  // Use useCallback for the filter function
  const handleFilter = useCallback(
    (filter: string) => {
      const filtered = baseFilteredProducts.filter(
        (product) => product.category.toLowerCase() === filter.toLowerCase()
      );
      //setFilteredProducts(filtered);
      // setActiveFilters(filter);
    },
    [baseFilteredProducts]
  );

  const handlePropertyFilter = (property: keyof Product, value: string) => {
    console.log(
      "HomePageMenu handlePropertyFilter-- property: " +
        property +
        " value: " +
        value
    );
    // setSelectedFilterValue(value);
    console.log("current baseFilteredProducts: ", baseFilteredProducts);
    if (value != "all") {
      // Filter from the base filtered products, not the already property-filtered products
      const filtered = baseFilteredProducts.filter(
        (p) => p[property] === value
      );
      console.log("filtered: ", filtered);
      // setFilteredProducts(filtered);
    } else {
      const filtered = baseFilteredProducts.filter((p) => p[property]);
      console.log("filtered: ", filtered);
      //  setFilteredProducts(filtered);
    }
  };

  const handleFilterClick = (copyCurrentFilter: string) => {
    console.log("copyCurrentFilter: " + copyCurrentFilter);
    //applyFilter();
  };

  const handleDetailedPropertyFilter = (
    property: keyof Product | string,
    subproperty: keyof Product | string,
    animal: string
  ) => {
    console.log(
      "handleDetailedPropertyFilter -- property: " +
        property +
        " value: " +
        subproperty +
        " subproperty: " +
        " animal: " +
        animal
    );
  };

  // Update when the main filter changes
  useEffect(() => {
    console.log("HPM filteredProducts: ", filteredProducts);
  }, [filteredProducts]);
  useEffect(() => {
    console.log("HPM currentFilter: ", currentFilter);
  }, [currentFilter]); // Update when the main filter changes
  useEffect(() => {
    console.log("HPM activeFilters: ", activeFilters);
  }, [activeFilters]);

  /*
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
  const availableFilters = getAvailableFilters();
  */

  const clearFilters = () => {
    resetFilters();
  };

  return (
    <div className="HomePageMenu">
      <MainNavigation
        onCategorySelect={handleCategorySelect}
        onSubcategorySelect={handleSubcategorySelect}
        // onSetActiveFilters={setActiveFilters}
        onHandlePropertyFilter={handlePropertyFilter}
        onHandleDetailedPropertyFilter={handleDetailedPropertyFilter}
        currentFilter={currentFilter}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">
              Showing:{" "}
              <span
                className="text-blue-500 hover:text-blue-700 cursor-pointer mr-1"
                onClick={() => handleFilterClick(currentFilter)}
              >
                {currentFilter}
              </span>
              {selectedFilterValue && (
                <span className="text-gray-600 mr-1">
                  / {selectedFilterValue}
                </span>
              )}
            </span>

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
            searched_Animal={searched_Animal}
            searched_Names={searched_Names}
            searched_Brand={searched_Brand}
            searched_Prices={searched_Prices}
          />

          {/* Product grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
              activeFilters ? "flex-1" : "w-full"
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
