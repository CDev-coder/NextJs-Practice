import MainNavigation from "../Header/MainNavigation";
import { useFilters } from "@context/FilterContext";
import { ActiveFilters } from "../../types";
import HomePageGrid from "./HomePageGrid";
import { useEffect } from "react";

const HomePageMenu = () => {
  const {
    applyFilter,
    filteredProducts,
    activeFilters,
    sort_Alphabetically,
    sort_PricePoint,
    sort_PriceRange,
    sort_Ratings,
    sort_ByField,
    resetFilters,
  } = useFilters();

  // Use displayProducts if set (from search), else filteredProducts
  const productsToShow = filteredProducts;

  const handleFilterClick = (
    copyCurrentFilter: ActiveFilters,
    searchBy: string,
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
      <MainNavigation />
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
