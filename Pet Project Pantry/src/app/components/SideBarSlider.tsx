import React, { useState, useEffect, useRef } from "react";
import Slider from "@mui/material/Slider";
import { ActiveFilters } from "../types";

interface PriceRangeSliderProps {
  activeFilters: ActiveFilters;
  onPriceRangeChange?: (filteredProducts: number[]) => void;
  increments: number;
}

const SideBarSlider: React.FC<PriceRangeSliderProps> = ({
  activeFilters,
  onPriceRangeChange,
  increments = 1,
}) => {
  // Get all prices and calculate min/max
  const prices = activeFilters.filtered_prices.map((prices) => prices);
  const absoluteMin = Math.min(...prices);
  const absoluteMax = Math.max(...prices);

  // Ref to store timeout for debounce
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // State for current range
  const [range, setRange] = useState<number[]>([absoluteMin, absoluteMax]);

  // Update range when products change
  useEffect(() => {
    setRange([absoluteMin, absoluteMax]);
  }, [absoluteMin, absoluteMax]);

  // Handle slider change
  const handleRangeChange = (
    event: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    const newRange = newValue as number[];
    setRange(newRange);
    // Only update the visual display — no filtering or scrolling yet
  };

  const handleRangeCommit = (
    event: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    const newRange = newValue as number[];

    // Clear any pending debounce timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Start a new debounce timer
    debounceRef.current = setTimeout(() => {
      const filteredProducts = activeFilters.filtered_prices.filter(
        (price) => price >= newRange[0] && price <= newRange[1]
      );

      if (onPriceRangeChange) {
        onPriceRangeChange(filteredProducts);
      }

      //window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300); // Adjust delay (300ms is typical)
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="sideBar-price-slider">
      <h3
        className="font-semibold text-lg mb-4 border-b pb-2"
        id={`sbfm_h3_PriceRange`}
      >
        Filter by Price Range
      </h3>
      <h3>Price Range</h3>

      <div className="slider-container mb-6">
        <Slider
          value={range}
          onChange={handleRangeChange}
          onChangeCommitted={handleRangeCommit}
          valueLabelDisplay="auto"
          valueLabelFormat={formatPrice}
          min={absoluteMin}
          max={absoluteMax}
          step={increments}
          sx={{
            color: "#3f51b5", // Custom color
            height: 8,
            "& .MuiSlider-thumb": {
              height: 24,
              width: 24,
              backgroundColor: "#fff",
              border: "2px solid currentColor",
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: "#3f51b5",
            },
          }}
        />
        <div className="selected-range-details">
          <p>
            Selected range: {formatPrice(range[0])} - {formatPrice(range[1])}
          </p>
          <p>
            Showing{" "}
            {
              activeFilters.filtered_prices.filter(
                (p) => p >= range[0] && p <= range[1]
              ).length
            }{" "}
            products
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBarSlider;
