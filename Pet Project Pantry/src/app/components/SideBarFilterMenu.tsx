// components/SideBarFilterMenu.tsx
"use client";

import { capitalizeFirst } from "../context/helperFunctions";
import { Product, ActiveFilters } from "../types";
import SideBarList from "./SideBarList";
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
    } | null
  ) => void;
  sort_Alphabetically: (order: string) => void;
  sort_PricePoint: (order: string) => void;
  sort_PriceRange: (order: number[]) => void;
  sort_ByField: <K extends keyof Product>(field: K, value: Product[K]) => void;
}

const SideBarFilterMenu = ({
  activeFilters,
  sort_Alphabetically,
  sort_PricePoint,
  sort_PriceRange,
  sort_ByField,
}: SideBarFilterMenuProps) => {
  console.log("activeFilters: ", activeFilters);

  const handleAlphabeticalFilter = (sortingRule: string) => {
    console.log("handleSort sortingRule: ", sortingRule);
    sort_Alphabetically(sortingRule);
  };

  const handlePricePointFilter = (priceRule: any) => {
    console.log("handlePriceFilter: ", priceRule);
    sort_PricePoint(priceRule);
  };

  const handlePriceRangeFilter = (priceRule: any) => {
    console.log("handlePriceRangeFilter: ", priceRule);
    sort_PriceRange(priceRule);
  };

  const handleFieldFilter = (field: any, rule: any) => {
    console.log("handleFieldFilter: " + field + " rule: " + rule);
    sort_ByField(field, rule);
  };

  return (
    <>
      {activeFilters && (
        <>
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 text-black">
              <SideBarList
                filterName={"animal"}
                activeFilters={activeFilters}
                copyList={activeFilters.filtered_animals}
                filterChange={handleFieldFilter}
              />
              <SideBarList
                filterName={"brand"}
                activeFilters={activeFilters}
                copyList={activeFilters.filtered_brands}
                filterChange={handleFieldFilter}
              />
              <SideBarToggle<string>
                filterName="name"
                activeFilters={activeFilters}
                copyList={activeFilters.filtered_names}
                options={[
                  { label: "A to Z", value: "asc" },
                  { label: "Z to A", value: "dsc" },
                ]}
                onChange={handleAlphabeticalFilter}
              />

              <SideBarToggle<number>
                filterName="price"
                activeFilters={activeFilters}
                copyList={activeFilters.filtered_prices}
                options={[
                  { label: "$ to $$$", value: 1 },
                  { label: "$$$ to $", value: 2 },
                ]}
                onChange={handlePricePointFilter}
              />
              <SideBarSlider
                priceArray={activeFilters.filtered_prices}
                onPriceRangeChange={handlePriceRangeFilter}
              />
              <SideBarList
                filterName={"subcategory"}
                activeFilters={activeFilters}
                copyList={activeFilters.filtered_subcategories}
                filterChange={handleFieldFilter}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SideBarFilterMenu;
