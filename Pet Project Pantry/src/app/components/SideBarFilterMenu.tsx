// components/SideBarFilterMenu.tsx
"use client";

import { capitalizeFirst } from "../context/helperFunctions";
import { Product, ActiveFilters } from "../types";
import SideBarList from "./SideBarList";
import PriceRangeSlider from "./SideBarSlider";

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
              {activeFilters.filtered_names.length > 1 && (
                <>
                  <h3
                    className="font-semibold text-lg mb-4 border-b pb-2"
                    id={`sbfm_h3_Name`}
                  >
                    Filter {capitalizeFirst(activeFilters.category)} by Name
                  </h3>
                  <div className="mb-6">
                    <ul className="space-y-2">
                      <li key={1}>
                        <button
                          className="w-full text-left px-3 py-2 rounded text-black hover:bg-gray-100"
                          onClick={() => {
                            handleAlphabeticalFilter("asc");
                          }}
                        >
                          {"A to Z"}
                        </button>
                      </li>
                      <li key={2}>
                        <button
                          className="w-full text-left px-3 py-2 rounded text-black hover:bg-gray-100"
                          onClick={() => {
                            handleAlphabeticalFilter("dsc");
                          }}
                        >
                          {"Z to A"}
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
              {activeFilters.filtered_prices.length > 1 && (
                <>
                  <h3
                    className="font-semibold text-lg mb-4 border-b pb-2"
                    id={`sbfm_h3_Name`}
                  >
                    Filter {capitalizeFirst(activeFilters.category)} by Price
                  </h3>
                  <div className="mb-6">
                    <ul className="space-y-2">
                      <li key={1}>
                        <button
                          className="w-full text-left px-3 py-2 rounded text-black hover:bg-gray-100"
                          onClick={() => {
                            handlePricePointFilter("low");
                          }}
                        >
                          {"$ to $$$"}
                        </button>
                      </li>
                      <li key={2}>
                        <button
                          className="w-full text-left px-3 py-2 rounded text-black hover:bg-gray-100"
                          onClick={() => {
                            handlePricePointFilter("high");
                          }}
                        >
                          {"$$$ to $"}
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
              <PriceRangeSlider
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
      {/*    
      ///activeFilters is how the selected secondary filter is shown at the top of the bar. 
      Once something is toggled by the first search, this area is also rendering that specific type of category search. 

       {(activeFilters || Object.keys(availableFilters).length > 0) && (
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4 text-black">
            {activeFilters && (
              <div className="mb-6">
                <h3
                  className="font-semibold text-lg mb-4 border-b pb-2"
                  id={`sbfm_h3_${activeFilters.property}`}
                >
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
                        onHandlePropertyFilter(activeFilters.property, "all");
                      }}
                    >
                      All
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
                        onClick={() => {
                          console.log(
                            "FILTERING BY: " +
                              activeFilters.property +
                              " value: " +
                              value
                          );
                          onHandlePropertyFilter(activeFilters.property, value);
                          ///Will need to fix this
                        }}
                      >
                        {value}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Object.entries(availableFilters).map(([property, values]) => (
              <div key={property} className="mb-6">
                <h3 className="font-semibold text-lg text-black mb-4 border-b pb-2">
                  Filter by {property}
                </h3>
                <ul className="space-y-2">
                  {values?.map((value, index) => (
                    <li key={index}>
                      <button
                        className="w-full text-left px-3 py-2 rounded text-black hover:bg-gray-100"
                        onClick={() => {
                          if (onSetActiveFilters) {
                            onSetActiveFilters({
                              property: property as keyof Product,
                              values: Array.from(
                                new Set(
                                  filteredProducts.map(
                                    (p) => p[property as keyof Product]
                                  )
                                )
                              ) as string[],
                            });
                          }

                          onHandlePropertyFilter(
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
        */}
    </>
  );
};

export default SideBarFilterMenu;
