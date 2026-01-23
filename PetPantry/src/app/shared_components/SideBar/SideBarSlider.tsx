import React, { useState, useEffect, useRef } from "react";
import Slider from "@mui/material/Slider";
import { ActiveFilters } from "../../types";

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
    newValue: number | number[],
  ) => {
    const newRange = newValue as number[];
    setRange(newRange);
    // Only update the visual display — no filtering or scrolling yet
  };

  const handleRangeCommit = (
    event: Event | React.SyntheticEvent,
    newValue: number | number[],
  ) => {
    const newRange = newValue as number[];

    // Clear any pending debounce timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Start a new debounce timer
    debounceRef.current = setTimeout(() => {
      const filteredProducts = activeFilters.filtered_prices.filter(
        (price) => price >= newRange[0] && price <= newRange[1],
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
  ///id={`sbfm_h3_PriceRange`}
  return (
    <div className="sideBar-price-slider">
      <h3
        className="font-semibold text-lg mb-4 border-b pb-2"
        id={`sbfm_h3_PriceRange`}
      >
        Filter by Price Range
      </h3>
      {/* Apply your Tailwind color class here (e.g., text-terracotta) to control the slider color */}
      <div className="slider-container mb-8 px-4 py-8 bg-slider-shadow/50 rounded-2xl text-navbar-text2">
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
            color: "currentColor", // Inherits from the parent's Tailwind class
            height: 6, // Slightly thinner track for a more refined look
            "& .MuiSlider-track": {
              border: "none",
              borderRadius: 4,
            },
            "& .MuiSlider-rail": {
              opacity: 0.3,
              backgroundColor: "#d6d3d1", // Stone-300 for a warm gray rail
            },
            "& .MuiSlider-thumb": {
              height: 24, // Increased size for better "touchability"
              width: 24,
              backgroundColor: "#FFF7ED", // Solid Warm Cream center
              border: "5px solid currentColor", // Extra thick terracotta ring to look like a "shell"
              boxShadow: "0 3px 6px rgba(0,0,0,0.15)", // Deeper shadow to give it physical "weight"

              // This removes the "hollow" look and ensures it's a solid bead
              "&:before": {
                display: "none",
              },

              // Subtle "squish" effect when clicking to make it feel tactile
              "&:active": {
                transform: "translate(-50%, -50%) scale(0.9)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
              },

              "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                // A soft terracotta glow that stays tight to the button
                boxShadow:
                  "0 0 0 6px color-mix(in srgb, currentColor 20%, transparent)",
              },
            },
            "& .MuiSlider-valueLabel": {
              lineHeight: 1.2,
              fontSize: 12,
              background: "unset",
              padding: 0,
              width: 42, // Slightly wider label
              height: 42,
              borderRadius: "50% 50% 50% 0", // "Teardrop" shape
              backgroundColor: "currentColor",
              transformOrigin: "bottom left",
              transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
              "&:before": { display: "none" },
              "&.MuiSlider-valueLabelOpen": {
                transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
              },
              "& > *": {
                transform: "rotate(45deg)",
              },
            },
          }}
        />

        <div className="mt-4 space-y-1 text-sm text-stone-500 italic">
          <p>
            Selected:{" "}
            <span className="text-navbar-text2 font-semibold">
              {formatPrice(range[0])} — {formatPrice(range[1])}
            </span>
          </p>
          <p className="text-s">
            {
              activeFilters.filtered_prices.filter(
                (p) => p >= range[0] && p <= range[1],
              ).length
            }{" "}
            items found
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBarSlider;
