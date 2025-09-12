// components/SideBarFilterMenu.tsx
"use client";

import { Product } from "../types";

interface SideBarFilterMenuProps {
  activeFilters?: {
    property: keyof Product;
    values: string[];
  } | null;
  availableFilters?: Partial<Record<keyof Product, string[]>>;
  selectedFilterValue: string | null;
  filteredProducts: Product[];
  currentFilter: string;
  onSetSelectedFilterValue?: (value: string | null) => void;
  onSetActiveFilters?: (
    filters: {
      property: keyof Product;
      values: string[];
    } | null
  ) => void;
  onHandlePropertyFilter: (property: keyof Product, value: string) => void;
  onHandleCategorySelect: (
    category: string,
    animal: string,
    subcategory: string
  ) => void;
}

const SideBarFilterMenu = ({
  activeFilters,
  availableFilters,
  selectedFilterValue,
  filteredProducts,
  currentFilter,
  onSetSelectedFilterValue,
  onSetActiveFilters,
  onHandlePropertyFilter,
  onHandleCategorySelect,
}: SideBarFilterMenuProps) => {
  return (
    <>
      {(activeFilters || Object.keys(availableFilters).length > 0) && (
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4 text-black">
            {/* Filter By aninmal Type */}
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

            {/* Additional filter options */}
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
      )}
    </>
  );
};

export default SideBarFilterMenu;
