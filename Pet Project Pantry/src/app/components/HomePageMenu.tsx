import MainNavigation from "./MainNavigation";
import { useFilters } from "@context/FilterContext";
import { ActiveFilters, Product } from "../types";
import HomePageGrid from "./HomePageGrid";
import { useEffect } from "react";
import { normalizeSubcategory } from "@context/normalizer";

const HomePageMenu = () => {
  const {
    applyFilter,
    filteredProducts,
    currentFilter,
    activeFilters,
    sort_Alphabetically,
    sort_PricePoint,
    sort_PriceRange,
    sort_Ratings,
    sort_ByField,
    resetFilters,
    displayProducts,
  } = useFilters();

  const handleCategorySelect = (
    category: keyof Product | string,
    animal: string,
    subcategory: keyof Product | string
  ) => applyFilter(category, animal, subcategory);

  const handleSubcategorySelect = (
    category: string,
    animal: string,
    subcategory: string
  ) => {
    const normalizedSubcategory = normalizeSubcategory(subcategory);
    applyFilter(category, animal, normalizedSubcategory);
  };

  // Use displayProducts if set (from search), else filteredProducts
  const productsToShow =
    displayProducts && displayProducts.length > 0
      ? displayProducts
      : filteredProducts;

  const handleFilterClick = (
    copyCurrentFilter: ActiveFilters,
    searchBy: string
  ) => {
    if (searchBy === "category")
      applyFilter(copyCurrentFilter.category, "all", "all");
    else if (searchBy === "animal")
      applyFilter(copyCurrentFilter.category, copyCurrentFilter.animal, "all");
  };

  const clearFilters = () => resetFilters();

  useEffect(() => {
    console.log("HPM activeFilters: ", activeFilters);
  }, [activeFilters]);

  return (
    <div className="HomePageMenu_mainDiv">
      <MainNavigation
        onCategorySelect={handleCategorySelect}
        onSubcategorySelect={handleSubcategorySelect}
        currentFilter={currentFilter}
      />
      <div className="HomePageMenu_containerDiv container mx-auto px-4 py-8">
        <HomePageGrid
          activeFilters={activeFilters}
          filteredProducts={productsToShow}
          sort_Alphabetically={sort_Alphabetically}
          sort_PricePoint={sort_PricePoint}
          sort_PriceRange={sort_PriceRange}
          sort_Ratings={sort_Ratings}
          sort_ByField={sort_ByField}
          clearFilters={clearFilters}
          handleFilterClick={handleFilterClick}
        />
      </div>
    </div>
  );
};

export default HomePageMenu;
