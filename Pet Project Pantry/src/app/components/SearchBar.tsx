"use client";
import useDebounce from "@hooks/useDebounce";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  delay?: number; // optional delay override
}

export default function SearchBar({ onSearch, delay = 400 }: SearchBarProps) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, delay);

  // When the debounced value updates, trigger the search
  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full sm:w-80 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
    />
  );
}
