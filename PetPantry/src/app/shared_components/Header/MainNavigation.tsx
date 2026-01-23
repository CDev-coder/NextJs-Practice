// components/MainNavigation.jsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "../../types";
import { useStickyNav } from "@/hooks/useStickyNav";
import { useFilters } from "../../context/FilterContext";
import { slugify, normalizeSubcategory } from "../../context/helperFunctions";

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
    subcategory: keyof Product | string,
  ) => {
    const normalizedSubcategory = normalizeSubcategory(String(subcategory));
    // Navigate to the new shop route
    router.push(
      `/shop/${slugify(String(category))}/${slugify(animal)}/${slugify(
        normalizedSubcategory,
      )}`,
    );
  };

  const handleCategoryClick = (animal: string, category: string) => {
    console.log(
      "MainNavigation handleCategoryClick animal: " +
        animal +
        " category: " +
        category,
    );
    setFallbackMessage(null);
    router.push(`/shop/${slugify(category)}/${slugify(animal)}/all`);
  };

  return (
    <nav
      className={`bg-navbar font-semibold ${
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
                className="bg-white/15 text-navbar-text antialiased tracking-wide [text-shadow:_0_-1.5px_0_rgba(0,0,0,0.5),_0_1px_0_rgba(255,255,255,0.3)] hover:bg-white/30 px-5 py-2 rounded-full transition-all duration-300 font-medium flex items-center gap-2"
                onClick={() => handleCategoryClick("all", key)}
              >
                {item.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {activeCategory === key && (
                <div className="absolute left-0 top-full w-max bg-[#FAF9F6] shadow-2xl z-50 rounded-3xl overflow-hidden text-stone-700 border border-orange-100/50">
                  <div className="p-8 grid grid-cols-3 gap-10">
                    {/* Column mapping (Dogs, Cats, Birds) */}
                    {["dog", "cat", "bird"].map((category_animal) => (
                      <div key={category_animal}>
                        <h3
                          className="text-navbar-text2 font-bold mb-4 text-lg cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() =>
                            handleCategoryClick(category_animal, key)
                          }
                        >
                          {category_animal.charAt(0).toUpperCase() +
                            category_animal.slice(1)}
                          s
                        </h3>
                        <ul className="space-y-1">
                          {item.subcategories[
                            category_animal as keyof typeof item.subcategories
                          ].map((subcat: string, index: number) => (
                            /* 1. Added group/item here so the dot knows when to show up */
                            <li key={index} className="group/item">
                              <button
                                className="relative text-stone-500 hover:text-navbar-text2 hover:bg-orange-50 px-3 py-1.5 -ml-3 rounded-lg transition-all duration-200 w-full text-left flex items-center"
                                onClick={() =>
                                  handleSubcategoryClick(
                                    key,
                                    category_animal,
                                    subcat,
                                  )
                                }
                              >
                                {/* 2. The Marker*/}
                                <span className="absolute left-2 w-1.5 h-1.5 rounded-full bg-navbar opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                <span className="tracking-tight pl-3">
                                  {subcat}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* View all button - "Cozy Footer" */}
                  <div className="bg-orange-100/30 px-6 py-4 border-t border-dashed border-orange-200 text-center">
                    <button
                      className="text-navbar-text2 font-bold hover:scale-105 transition-transform duration-200"
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
