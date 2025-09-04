// components/MainMenu.jsx
"use client";

import { useState } from "react";
import HoverMenu from "./MainNavigation";
import { Product } from "../types";
import ProductCard from "./ProductCard";

const MainMenu = ({ products }: { products: Product[] }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentFilter, setCurrentFilter] = useState("All Products");

  const handleCategorySelect = (category: string) => {
    const filtered = products.filter((p) => p.category === category);
    setFilteredProducts(filtered);
    setCurrentFilter(category.charAt(0).toUpperCase() + category.slice(1));
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
  };

  const clearFilters = () => {
    setFilteredProducts(products);
    setCurrentFilter("All Products");
  };

  return (
    <div className="MainMenu">
      <HoverMenu
        onCategorySelect={handleCategorySelect}
        onSubcategorySelect={handleSubcategorySelect}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">Showing: {currentFilter}</span>
            <button
              onClick={clearFilters}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
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

export default MainMenu;
