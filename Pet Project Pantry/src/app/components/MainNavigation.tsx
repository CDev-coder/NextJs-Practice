// components/MainNavigation.jsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "../types";
import { useStickyNav } from "@/hooks/useStickyNav";
import { useFilters } from "../context/FilterContext";
import { slugify, normalizeSubcategory } from "../context/helperFunctions";

// Define TypeScript interfaces for the props
interface MenuItem {
  name: string;
  subcategories: {
    dog: string[];
    cat: string[];
    bird: string[];
  };
}

const MainNavigation = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const isSticky = useStickyNav(50);
  const { setFallbackMessage } = useFilters();
  // Menu structure with proper typing
  const menuItems: Record<string, MenuItem> = {
    food: {
      name: "Food",
      subcategories: {
        dog: ["Dry", "Wet", "Grain-Free", "Puppy", "Senior"],
        cat: ["Dry", "Wet", "Grain-Free", "Kitten", "Senior"],
        bird: ["Seeds", "Pellets", "Treat Mixes", "Nutritional Supplements"],
      },
    },
    accessories: {
      name: "Accessories",
      subcategories: {
        dog: ["Collars", "Leashes", "Harnesses", "Bowls", "Beds"],
        cat: ["Collars", "Scratching Posts", "Litter Boxes", "Bowls", "Beds"],
        bird: ["Cages", "Perches", "Feeders", "Nesting Boxes", "Play Gyms"],
      },
    },
    treats: {
      name: "Treats",
      subcategories: {
        dog: ["Training", "Dental", "Natural", "Chews", "Biscuits"],
        cat: ["Crunchy", "Soft", "Dental", "Catnip", "Freeze-Dried"],
        bird: ["Sticks", "Fruit", "Seed Balls", "Millet Sprays", "Nutritional"],
      },
    },
    toys: {
      name: "Toys",
      subcategories: {
        dog: ["Chew", "Plush", "Interactive", "Fetch", "Rope"],
        cat: ["Interactive", "Feather", "Balls", "Catnip", "Tunnels"],
        bird: ["Mirrors", "Bells", "Swings", "Foraging", "Wooden"],
      },
    },
  };

  const handleCategoryHover = (category: string) => {
    setActiveCategory(category);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  const handleSubcategoryClick = (
    category: keyof Product | string,
    animal: string,
    subcategory: keyof Product | string
  ) => {
    const normalizedSubcategory = normalizeSubcategory(String(subcategory));
    // Navigate to the new shop route
    router.push(
      `/shop/${slugify(String(category))}/${slugify(animal)}/${slugify(
        normalizedSubcategory
      )}`
    );
  };

  const handleCategoryClick = (animal: string, category: string) => {
    console.log(
      "MainNavigation handleCategoryClick animal: " +
        animal +
        " category: " +
        category
    );
    setFallbackMessage(null);
    router.push(`/shop/${slugify(category)}/${slugify(animal)}/all`);
  };

  return (
    <nav
      className={`bg-(--accent-2) font-semibold ${
        isSticky ? "sticky top-0 z-50 shadow-md" : "relative"
      }`}
    >
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-8">
          {Object.entries(menuItems).map(([key, item]) => (
            <li
              key={key}
              className="relative py-4  text-black hover:text-white"
              onMouseEnter={() => handleCategoryHover(key)}
              onMouseLeave={handleCategoryLeave}
            >
              <button
                className="px-3 py-2 hover:text-white hover:bg-(--accent-3) rounded transition-colors"
                onClick={() => handleCategoryClick("all", key)}
              >
                {item.name}
              </button>

              {/* Dropdown menu */}
              {activeCategory === key && (
                <div className="absolute left-0 top-full w-max bg-white shadow-xl z-50 rounded-b-md overflow-hidden text-black">
                  <div className="p-6 grid grid-cols-3 gap-8">
                    {/* Dogs column */}
                    <div>
                      <h3
                        className="dropdown-header"
                        onClick={() => handleCategoryClick("dog", key)}
                      >
                        Dogs
                      </h3>
                      <ul className="space-y-2">
                        {item.subcategories.dog.map((subcat, index) => (
                          <li key={index}>
                            <button
                              className="dropdown-btn"
                              onClick={() =>
                                handleSubcategoryClick(key, "dog", subcat)
                              }
                            >
                              {subcat}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cats column */}
                    <div>
                      <h3
                        className="dropdown-header"
                        onClick={() => handleCategoryClick("cat", key)}
                      >
                        Cats
                      </h3>
                      <ul className="space-y-2">
                        {item.subcategories.cat.map((subcat, index) => (
                          <li key={index}>
                            <button
                              className="dropdown-btn"
                              onClick={() =>
                                handleSubcategoryClick(key, "cat", subcat)
                              }
                            >
                              {subcat}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Birds column */}
                    <div>
                      <h3
                        className="dropdown-header"
                        onClick={() => handleCategoryClick("bird", key)}
                      >
                        Birds
                      </h3>
                      <ul className="space-y-2">
                        {item.subcategories.bird.map((subcat, index) => (
                          <li key={index}>
                            <button
                              className="dropdown-btn"
                              onClick={() =>
                                handleSubcategoryClick(key, "bird", subcat)
                              }
                            >
                              {subcat}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* View all button */}
                  <div className="bg-gray-100 px-6 py-3 border-t text-black">
                    <button
                      className="text-petflow-blue font-semibold hover:underline"
                      onClick={() => handleCategoryClick("all", key)}
                    >
                      View All {item.name}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;
