// components/SideBarFilterMenu.tsx
"use client";

import { Product, ActiveFilters } from "../../types";
import SideBarList from "./SideBarList";
import SideBarRatings from "./SideBarRatings";
import SideBarSlider from "./SideBarSlider";
import SideBarToggle from "./SideBarToggle";

interface SideBarFilterMenuProps {
  searched_Brand?: string[];
  searched_Animal?: string[];
  searched_Names?: string[];
  searched_Prices?: string[];
  activeFilters?: ActiveFilters | null;
  availableFilters?: Partial<Record<keyof Product, string[]>>;
  onSetSelectedFilterValue?: (value: string | null) => void;
  onSetActiveFilters?: (
    filters: {
      property: keyof Product;
      values: string[];
    } | null,
  ) => void;
  sort_Alphabetically: (order: string) => void;
  sort_PricePoint: (order: string | number) => void;
  sort_PriceRange: (order: number[]) => void;
  sort_Ratings: (order: number) => void;
  sort_ByField: <K extends keyof Product>(field: K, value: Product[K]) => void;
}

const SideBarFilterMenu = ({
  activeFilters,
  sort_Alphabetically,
  sort_PricePoint,
  sort_PriceRange,
  sort_ByField,
  sort_Ratings,
}: SideBarFilterMenuProps) => {
  console.log("activeFilters: ", activeFilters);

  const handleAlphabeticalFilter = (sortingRule: string) => {
    console.log("handleSort sortingRule: ", sortingRule);
    sort_Alphabetically(sortingRule);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePricePointFilter = (priceRule: string | number) => {
    console.log("handlePriceFilter: ", priceRule);
    sort_PricePoint(priceRule);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePriceRangeFilter = (priceRule: number[]) => {
    console.log("handlePriceRangeFilter: ", priceRule);
    sort_PriceRange(priceRule);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFieldFilter = (
    field: keyof Product,
    rule: Product[keyof Product],
  ) => {
    console.log("handleFieldFilter: " + field + " rule: " + rule);
    sort_ByField(field, rule);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRatingClick = (rating: number) => {
    console.log("Filter items with rating:", rating);
    sort_Ratings(rating);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <>
        {activeFilters && (
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 text-black border border-mborder">
              <SideBarList
                filterName={"animal"}
                filterby={"filtered_animals"}
                activeFilters={activeFilters}
                filterChange={handleFieldFilter}
              />
              <SideBarList
                filterName={"brand"}
                filterby={"filtered_brands"}
                activeFilters={activeFilters}
                filterChange={handleFieldFilter}
              />
              <SideBarToggle<string>
                filterby={"filtered_names"}
                activeFilters={activeFilters}
                options={[
                  { label: "A to Z", value: "asc" },
                  { label: "Z to A", value: "dsc" },
                ]}
                onChange={handleAlphabeticalFilter}
              />

              <SideBarToggle<number>
                filterby={"filtered_prices"}
                activeFilters={activeFilters}
                options={[
                  { label: "$ to $$$", value: 1 },
                  { label: "$$$ to $", value: 2 },
                ]}
                onChange={handlePricePointFilter}
              />

              <SideBarSlider
                activeFilters={activeFilters}
                increments={1}
                onPriceRangeChange={handlePriceRangeFilter}
              />

              <SideBarRatings
                activeFilters={activeFilters}
                size={20}
                color="#FF9900"
                onRatingClick={handleRatingClick}
              />
              <SideBarList
                filterName={"subcategory"}
                filterby={"filtered_subcategories"}
                activeFilters={activeFilters}
                filterChange={handleFieldFilter}
              />
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default SideBarFilterMenu;
