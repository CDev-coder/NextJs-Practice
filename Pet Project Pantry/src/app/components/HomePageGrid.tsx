// components/HomePageGrid.tsx
"use client";

import ProductCard from "./ProductCard";
import SideBarFilterMenu from "./SideBarFilterMenu";
import { capitalizeFirst } from "../context/helperFunctions";
import { ActiveFilters, Product } from "../types";

interface HomePageGridProps {
  activeFilters: ActiveFilters;
  filteredProducts: Product[];
  sort_Alphabetically: (order: string) => void;
  sort_PricePoint: (order: string) => void;
  sort_PriceRange: (order: number[]) => void;
  sort_Ratings: (order: number) => void;
  sort_ByField: <K extends keyof Product>(field: K, value: Product[K]) => void;
  clearFilters: () => void;
  handleFilterClick: (
    copyCurrentFilter: ActiveFilters,
    searchBy: string
  ) => void;
}

const HomePageGrid = ({
  activeFilters,
  filteredProducts,
  sort_Alphabetically,
  sort_PricePoint,
  sort_PriceRange,
  sort_Ratings,
  sort_ByField,
  clearFilters,
  handleFilterClick,
}: HomePageGridProps) => {
  return (
    <>
      {/* Filter Display Header */}
      <div className="flex justify-between items-center mb-6 filterDisplay_Div">
        <div className="flex items-center">
          <span className="text-gray-600 mr-4">
            Showing: {activeFilters == null && "All Products"}
            {activeFilters && (
              <>
                <span
                  className="text-blue-500 hover:text-blue-700 cursor-pointer mr-1"
                  onClick={() => handleFilterClick(activeFilters, "category")}
                >
                  {capitalizeFirst(activeFilters.category)}
                </span>

                {activeFilters.animal !== "all" && (
                  <>
                    {" / "}
                    <span
                      className="text-blue-500 hover:text-blue-700 cursor-pointer mr-1"
                      onClick={() => handleFilterClick(activeFilters, "animal")}
                    >
                      {capitalizeFirst(activeFilters.animal)}
                    </span>
                  </>
                )}

                {activeFilters.subcategory !== "all" && (
                  <>
                    {" / "}
                    <span
                      className="text-blue-500 hover:text-blue-700 cursor-pointer mr-1"
                      onClick={() =>
                        handleFilterClick(activeFilters, "subcategory")
                      }
                    >
                      {capitalizeFirst(activeFilters.subcategory)}
                    </span>
                  </>
                )}
              </>
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

      <div className="flex gap-8 sideNavigationMenu_Div">
        {/* Sidebar Filters */}
        <SideBarFilterMenu
          activeFilters={activeFilters}
          sort_Alphabetically={sort_Alphabetically}
          sort_PricePoint={sort_PricePoint}
          sort_PriceRange={sort_PriceRange}
          sort_ByField={sort_ByField}
          sort_Ratings={sort_Ratings}
        />

        {/* Product Grid */}
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
    </>
  );
};

export default HomePageGrid;
