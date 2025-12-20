import MainNavigation from "./MainNavigation";
import { useFilters } from "@context/FilterContext";
import { ActiveFilters, Product } from "../types";
import HomePageShowcase from "./HomePageShowcase";
import HomePageGrid from "./HomePageGrid";
import { useEffect, useMemo } from "react";
import { normalizeSubcategory } from "@context/normalizer";
import { useSearchParams } from "next/navigation";

interface HomePageMenuProps {
  products: Product[];
}

const HomePageMenu = ({ products }: HomePageMenuProps) => {
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

  const searchParams = useSearchParams();

  const baseFilteredProducts = useMemo(() => products, [products]);
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

  const noActiveFilters =
    !activeFilters ||
    (activeFilters.category === "all" &&
      activeFilters.animal === "all" &&
      activeFilters.subcategory === "all");

  // Determine if we should show the grid (filtered/search results) or showcase (default)
  const showGrid =
    (displayProducts && displayProducts.length > 0) || !noActiveFilters;

  useEffect(() => {
    const category = searchParams.get("category") ?? "all";
    const animal = searchParams.get("animal") ?? "all";
    const subcategory = searchParams.get("subcategory") ?? "all";

    const normalizedSubcategory =
      subcategory !== "all" ? normalizeSubcategory(subcategory) : "all";

    if (
      category !== "all" ||
      animal !== "all" ||
      normalizedSubcategory !== "all"
    ) {
      applyFilter(category, animal, normalizedSubcategory);
    }
  }, []);

  return (
    <div className="HomePageMenu_mainDiv">
      <MainNavigation
        onCategorySelect={handleCategorySelect}
        onSubcategorySelect={handleSubcategorySelect}
        currentFilter={currentFilter}
      />
      <div className="HomePageMenu_containerDiv container mx-auto px-4 py-8">
        {showGrid ? (
          <HomePageGrid
            activeFilters={activeFilters}
            filteredProducts={productsToShow} // Use productsToShow here
            sort_Alphabetically={sort_Alphabetically}
            sort_PricePoint={sort_PricePoint}
            sort_PriceRange={sort_PriceRange}
            sort_Ratings={sort_Ratings}
            sort_ByField={sort_ByField}
            clearFilters={clearFilters}
            handleFilterClick={handleFilterClick}
          />
        ) : (
          <HomePageShowcase products={products} />
        )}
      </div>
    </div>
  );
};

export default HomePageMenu;
