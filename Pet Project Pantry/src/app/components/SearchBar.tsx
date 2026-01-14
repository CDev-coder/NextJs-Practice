"use client";

import { useState, useEffect, useRef } from "react";
import { useFilters } from "@context/FilterContext";
import { useRouter, usePathname } from "next/navigation";
import { slugify } from "@context/helperFunctions";

interface SearchBarProps {
  placeholder?: string;
}

interface SuggestionItem {
  type: "product" | "brand" | "category" | "animal" | "subcategory";
  value: string;
  score: number;
}

const SearchBar = ({
  placeholder = "Search products...",
  onSuggestionSelect,
}: SearchBarProps & {
  onSuggestionSelect?: (
    category: string,
    animal: string,
    subcategory: string
  ) => void;
}) => {
  const {
    baseProducts,
    applyFilter,
    resetFilters,
    setDisplayProducts,
    setFallbackMessage,
  } = useFilters();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // -------------------------
  // Hide suggestion menu on outside click
  // -------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // -------------------------
  // Hide suggestions when category changes
  // -------------------------
  useEffect(() => {
    setShowSuggestions(false);
  }, [selectedCategory]);

  // -------------------------
  // Debounced suggestions
  // -------------------------
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(
      () => updateSuggestions(searchTerm),
      250
    );
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchTerm, selectedCategory]);

  // -------------------------
  // Fuzzy match scoring
  // -------------------------
  const getScore = (source: string, term: string) => {
    const lowerSource = source.toLowerCase();
    const index = lowerSource.indexOf(term);
    if (index === -1) return 0;
    return term.length / lowerSource.length + 1 / (index + 1);
  };

  const updateSuggestions = (term: string) => {
    const lowerTerm = term.trim().toLowerCase();
    if (!lowerTerm) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const productPool =
      selectedCategory === "all"
        ? baseProducts
        : baseProducts.filter(
            (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
          );

    const results: SuggestionItem[] = [];

    const addSuggestion = (
      value: string,
      type: SuggestionItem["type"],
      score: number
    ) => {
      if (!results.find((s) => s.value === value && s.type === type)) {
        results.push({ value, type, score });
      } else {
        const existing = results.find(
          (s) => s.value === value && s.type === type
        );
        if (existing && score > existing.score) existing.score = score;
      }
    };

    // Priority: animal → product → brand → category → subcategory
    productPool.forEach((p) => {
      const scoreAnimal = getScore(p.animal, lowerTerm);
      if (scoreAnimal > 0) addSuggestion(p.animal, "animal", scoreAnimal);

      const scoreName = getScore(p.name, lowerTerm);
      if (scoreName > 0) addSuggestion(p.name, "product", scoreName);

      const scoreBrand = getScore(p.brand, lowerTerm);
      if (scoreBrand > 0) addSuggestion(p.brand, "brand", scoreBrand);

      const scoreSub = getScore(p.subcategory, lowerTerm);
      if (scoreSub > 0) addSuggestion(p.subcategory, "subcategory", scoreSub);
    });

    if (selectedCategory === "all") {
      baseProducts.forEach((p) => {
        const scoreCat = getScore(p.category, lowerTerm);
        if (scoreCat > 0) addSuggestion(p.category, "category", scoreCat);
      });
    }

    // Sort by type priority + score
    const blendedResults = [
      ...results
        .filter((s) => s.type === "animal")
        .sort((a, b) => b.score - a.score),
      ...results
        .filter((s) => s.type === "product")
        .sort((a, b) => b.score - a.score),
      ...results
        .filter((s) => s.type === "brand")
        .sort((a, b) => b.score - a.score),
      ...results
        .filter((s) => s.type === "category")
        .sort((a, b) => b.score - a.score),
      ...results
        .filter((s) => s.type === "subcategory")
        .sort((a, b) => b.score - a.score),
    ];

    setSuggestions(blendedResults.slice(0, 12));
    setShowSuggestions(true);
    setHighlightIndex(null);
  };

  // -------------------------
  // Handle search
  // -------------------------
  const handleSearch = (item?: string | SuggestionItem) => {
    console.log("handleSearch-----------");
    console.log("item: ", item);
    setFallbackMessage(null);
    setShowSuggestions(false);

    // -------------------------
    // Determine the search term
    // -------------------------
    const rawTerm = item
      ? typeof item === "string"
        ? item.trim()
        : item.value.trim()
      : searchTerm.trim();

    const term = rawTerm.toLowerCase();
    console.log("Search term: ", term);

    if (!term) {
      resetFilters();
      return;
    }

    let matchedProducts: typeof baseProducts = [];

    // -------------------------
    // Promote free-text to suggestion if exact match exists
    // -------------------------
    if (!item && term && suggestions.length > 0) {
      const matchedSuggestion = suggestions.find(
        (s) => s.value.toLowerCase() === term
      );
      if (matchedSuggestion) {
        item = matchedSuggestion;
        console.log("Promoted to suggestion:", item);
      }
    }

    // -------------------------
    // Suggestion clicked
    // -------------------------
    if (typeof item !== "string" && item?.type) {
      switch (item.type) {
        case "category":
          applyFilter(item.value.toLowerCase(), "all", "all");
          router.push(`/shop/${slugify(item.value)}`);
          break;
        case "animal":
          applyFilter(selectedCategory, item.value.toLowerCase(), "all");
          router.push(`/shop/all/${slugify(item.value)}`);
          break;
        case "subcategory":
          applyFilter(selectedCategory, "all", item.value.toLowerCase());
          router.push(`/shop/all/all/${slugify(item.value)}`);
          break;
        case "brand":
          matchedProducts =
            selectedCategory === "all"
              ? baseProducts.filter(
                  (p) => p.brand.toLowerCase() === item.value.toLowerCase()
                )
              : baseProducts.filter(
                  (p) =>
                    p.brand.toLowerCase() === item.value.toLowerCase() &&
                    p.category.toLowerCase() === selectedCategory.toLowerCase()
                );
          setDisplayProducts(matchedProducts);
          break;
        case "product":
          matchedProducts = baseProducts.filter(
            (p) => p.name.toLowerCase() === item.value.toLowerCase()
          );
          // Navigate to product details instead of setting displayProducts
          if (matchedProducts.length > 0) {
            router.push(`/products/${matchedProducts[0].id}`);
          }
          break;
      }
    } else {
      console.log("MANUALLY SEARCH");
      // -------------------------
      // Free-text fuzzy search when no suggestion matched
      // -------------------------
      const scoredProducts = baseProducts.map((p) => {
        const nameScore = getScore(p.name, term);
        const brandScore = getScore(p.brand, term);
        const animalScore = getScore(p.animal, term);
        const categoryScore = getScore(p.category, term);
        const subcategoryScore = getScore(p.subcategory, term);
        const totalScore =
          nameScore * 3 +
          brandScore * 2 +
          animalScore * 2 +
          categoryScore +
          subcategoryScore;
        return { product: p, score: totalScore };
      });
      console.log("scoredProducts: ", scoredProducts);
      matchedProducts = scoredProducts
        .filter((p) => p.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((p) => p.product);
      console.log("matchedProducts: ", matchedProducts);
      // -------------------------
      // Fallback if nothing matched exactly
      // -------------------------
      if (matchedProducts.length === 0) {
        const topMatches = scoredProducts
          .sort((a, b) => b.score - a.score)
          .slice(0, 4) // show 4 “best guess” items
          .map((p) => p.product);

        setFallbackMessage(
          `Can't find "${rawTerm}", but here are a few items that might match:`
        );
        console.log("SUGGESTION MATCHES");
        // Navigate to the first top match's product details instead of setting displayProducts
        if (topMatches.length > 0) {
          router.push(`/shop/${topMatches[0].category}`);
        } else {
          setDisplayProducts([]); // Fallback if no matches at all
        }
      } else {
        console.log("EXACT MATCHES");
        // Navigate to the first matched product's details
        //router.push(`/products/${matchedProducts[0].id}`);
        router.push(
          `/shop/${matchedProducts[0].category}/${matchedProducts[0].animal}/${matchedProducts[0].subcategory}`
        );
      }
    }
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (item: SuggestionItem) => {
    setSearchTerm(item.value);
    handleSearch(item);
  };

  // -------------------------
  // Keyboard navigation
  // -------------------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) =>
        prev === null || prev >= suggestions.length - 1 ? 0 : prev + 1
      );
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) =>
        prev === null || prev <= 0 ? suggestions.length - 1 : prev - 1
      );
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (highlightIndex !== null) {
        handleSelectSuggestion(suggestions[highlightIndex]);
      } else {
        handleSearch();
      }
      e.preventDefault();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // Assuming suggestion has category, animal, subcategory
    const { category, animal, subcategory } = suggestion;
    if (onSuggestionSelect) onSuggestionSelect(category, animal, subcategory);
    // Navigate to the new shop route (category first)
    router.push(
      `/shop/${slugify(category)}/${slugify(animal)}/${slugify(
        subcategory || "all"
      )}`
    );
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {Array.from(new Set(baseProducts.map((p) => p.category))).map(
            (cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            )
          )}
        </select>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="flex-1 border-t border-b border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => searchTerm && setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(); // always use current searchTerm
            } else {
              handleKeyDown;
            }
          }}
        />

        <button
          type="button"
          onClick={() => handleSearch()} // uses current searchTerm
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Go
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestionsUL absolute bg-white border rounded-md shadow-lg mt-1 w-full z-50 max-h-64 overflow-auto">
          {suggestions.map((s, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(s)}
              className={`flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                highlightIndex === index ? "bg-blue-100" : ""
              }`}
            >
              <span>{s.value}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700 capitalize">
                {s.type}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
