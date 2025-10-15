import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Product } from "../types";

interface PriceRangeSliderProps {
  priceArray: any[];
  onPriceRangeChange?: (filteredProducts: Product[]) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  priceArray,
  onPriceRangeChange,
}) => {
  // Get all prices and calculate min/max
  const prices = priceArray.map((prices) => prices);
  const absoluteMin = Math.min(...prices);
  const absoluteMax = Math.max(...prices);

  // State for current range
  const [range, setRange] = useState<number[]>([absoluteMin, absoluteMax]);

  // Update range when products change
  useEffect(() => {
    setRange([absoluteMin, absoluteMax]);
  }, [absoluteMin, absoluteMax]);

  // Handle slider change
  const handleRangeChange = (event: Event, newValue: number | number[]) => {
    const newRange = newValue as number[];
    setRange(newRange);

    // Filter products based on the new range
    const filteredProducts = priceArray.filter(
      (priceArray) => priceArray >= newRange[0] && priceArray <= newRange[1]
    );
    console.log("filteredProducts: ", filteredProducts);
    if (onPriceRangeChange) {
      onPriceRangeChange(filteredProducts);
    }
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="price-range-slider">
      <h3
        className="font-semibold text-lg mb-4 border-b pb-2"
        id={`sbfm_h3_PriceRange`}
      >
        Filter by Price Range
      </h3>
      <h3>Price Range</h3>

      <div className="slider-container">
        <Slider
          value={range}
          onChange={handleRangeChange}
          onChangeCommitted={(event, newValue) => {
            // This fires when user stops sliding (for better performance)
            console.log("Final selection:", newValue);
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={formatPrice}
          min={absoluteMin}
          max={absoluteMax}
          step={1}
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
      </div>

      <div className="price-labels">
        <span>{formatPrice(absoluteMin)}</span>
        {" - "}
        <span>{formatPrice(absoluteMax)}</span>
      </div>

      <div className="selected-range">
        <p>
          Selected range: {formatPrice(range[0])} - {formatPrice(range[1])}
        </p>
        <p>
          Showing{" "}
          {priceArray.filter((p) => p >= range[0] && p <= range[1]).length}{" "}
          products
        </p>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
