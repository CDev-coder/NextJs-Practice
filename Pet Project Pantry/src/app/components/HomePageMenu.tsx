// components/HomePageMenu.tsx
"use client";

import MainNavigation from "./MainNavigation";
import { useFilters } from "../context/FilterContext";
import ProductCard from "./ProductCard";
import { Product } from "../types";

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

  const handlePropertyFilter = (property: keyof Product, value: string) => {
    setSelectedFilterValue(value);

    // Filter products by the selected property value
    const filtered = filteredProducts.filter((p) => p[property] === value);

    setFilteredProducts(filtered);
  };

  const getAvailableFilters = () => {
    const availableFilters: Partial<Record<keyof Product, string[]>> = {};

    filterableProperties.forEach((property) => {
      if (property !== activeFilters?.property) {
        const values = Array.from(
          new Set(filteredProducts.map((p) => p[property]))
        );
        availableFilters[property] = values as string[];
      }
    });

    return availableFilters;
  };

  const clearFilters = () => {
    setFilteredProducts(products);
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
          {(activeFilters || Object.keys(availableFilters).length > 0) && (
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-4 text-black">
                {/* Active filter section */}
                {activeFilters && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-4 border-b pb-2">
                      Filter by {activeFilters.property}
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <button
                          className={`w-full text-left px-3 py-2 rounded text-black ${
                            selectedFilterValue === null
                              ? "bg-petflow-blue text-white"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            setSelectedFilterValue(null);
                            // Reset to the current category filter
                            if (currentFilter !== "All Products") {
                              handleCategorySelect(currentFilter.toLowerCase());
                            }
                          }}
                        >
                          All {activeFilters.property}
                        </button>
                      </li>
                      {activeFilters.values.map((value, index) => (
                        <li key={index}>
                          <button
                            className={`w-full text-left px-3 py-2 rounded text-black ${
                              selectedFilterValue === value
                                ? "bg-petflow-blue text-white"
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() =>
                              handlePropertyFilter(
                                activeFilters.property,
                                value
                              )
                            }
                          >
                            {value}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Additional filter options */}
                {Object.entries(availableFilters).map(([property, values]) => (
                  <div key={property} className="mb-6">
                    <h3 className="font-semibold text-lg text-black mb-4 border-b pb-2">
                      Filter by {property}
                    </h3>
                    <ul className="space-y-2">
                      {values.map((value, index) => (
                        <li key={index}>
                          <button
                            className="w-full text-left px-3 py-2 rounded text-black hover:bg-gray-100"
                            onClick={() => {
                              setActiveFilters({
                                property: property as keyof Product,
                                values: Array.from(
                                  new Set(
                                    filteredProducts.map(
                                      (p) => p[property as keyof Product]
                                    )
                                  )
                                ) as string[],
                              });
                              handlePropertyFilter(
                                property as keyof Product,
                                value
                              );
                            }}
                          >
                            {value}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

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
