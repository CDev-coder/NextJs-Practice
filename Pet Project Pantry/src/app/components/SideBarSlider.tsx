interface PriceRangeSliderProps {
  priceArray: number[];
  onFilter: () => void;
}

export const PriceRangeSlider({ priceArray, onFilter }:PriceRangeSliderProps) {
  const prices = priceArray.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [range, setRange] = useState([minPrice, maxPrice]);

  const handleRangeChange = (e, newValue) => {
    setRange(newValue);
    const filtered = priceArray.filter(
      (product) => product.price >= newValue[0] && product.price <= newValue[1]
    );
    onFilter(filtered);
  };

  return (
    <div className="price-slider">
      <h4>
        Price Range: ${range[0]} - ${range[1]}
      </h4>
      <Slider
        value={range}
        onChange={handleRangeChange}
        valueLabelDisplay="auto"
        min={minPrice}
        max={maxPrice}
        step={1}
      />
      <div className="slider-labels">
        <span>${minPrice}</span>
        <span>${maxPrice}</span>
      </div>
    </div>
  );
}
