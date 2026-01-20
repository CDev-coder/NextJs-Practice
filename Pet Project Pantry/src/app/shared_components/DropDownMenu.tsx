"use client";

import { useState } from "react";
import { Product, AnimalType } from "../types";

interface DropDownMenuProps {
  menuProducts: Product[];
  onFilterChange?: (animalType: AnimalType) => void;
}

const DropDownMenu = ({ menuProducts, onFilterChange }: DropDownMenuProps) => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>("all");
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Extract unique animal types from products
  const animalTypes: AnimalType[] = [
    "all",
    ...new Set(menuProducts.map((p) => p.animalType as AnimalType)),
  ];

  const handleSelect = (animalType: AnimalType) => {
    setSelectedAnimal(animalType);
    setIsOpen(false);
    setOpenSubmenu(null);
    if (onFilterChange) {
      onFilterChange(animalType);
    }
  };

  const toggleSubmenu = (submenu: string) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };

  // Sample submenu data structure
  const submenuData = {
    dog: {
      title: "Dog",
      categories: [
        {
          name: "Food",
          items: [
            "Dry",
            "Wet",
            "Freeze-Dried",
            "Prescription Food",
            "Toppers + Mixers",
            "Puppy Food",
          ],
        },
        {
          name: "Treats",
          items: [
            "Biscuits + Crunchy",
            "Soft + Chewy",
            "Bully Sticks",
            "Jerky",
            "Bones + Chews",
            "Dental",
          ],
        },
        {
          name: "Toys",
          items: [
            "Chew",
            "Plush",
            "Fetch",
            "Rope + Tug",
            "Interactive",
            "Puppy Toys",
          ],
        },
        {
          name: "Health & Wellness",
          items: [
            "Vitamins + Supplements",
            "Flea + Tick",
            "Grooming",
            "Healthcare",
            "Calming Aids",
          ],
        },
      ],
    },
    cat: {
      title: "Cat",
      categories: [
        {
          name: "Food",
          items: [
            "Dry",
            "Wet",
            "Freeze-Dried",
            "Prescription Food",
            "Variety Packs",
            "Kitten Food",
          ],
        },
        {
          name: "Litter & Accessories",
          items: ["Litter", "Litter Boxes", "Litter Accessories", "Cleaning"],
        },
        {
          name: "Treats",
          items: [
            "Crunchy",
            "Soft + Chewy",
            "Catnip",
            "Freeze-Dried",
            "Dental",
            "Pill Pockets",
          ],
        },
        {
          name: "Toys",
          items: ["Interactive", "Scratchers", "Catnip", "Plush"],
        },
      ],
    },
    bird: {
      title: "Bird",
      categories: [
        {
          name: "Food",
          items: [
            "Parakeet",
            "Conure & Cockatiel",
            "Parrot & Macaw",
            "Canary & Finch",
            "Dove",
            "Baby Bird",
          ],
        },
      ],
    },
  };

  return (
    <div className="relative mb-6 w-full max-w-4xl">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Animal
      </label>
      <button
        type="button"
        className="relative w-full bg-petflow-blue text-white font-semibold border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <span className="ml-3 block truncate capitalize">
            {selectedAnimal === "all" ? "All Animals" : selectedAnimal}
          </span>
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full w-full z-30 shadow-xl bg-white rounded-b-md overflow-hidden">
          <div className="flex">
            {/* Primary animal selection */}
            <div className="w-64 border-r border-gray-200 bg-gray-50">
              <div className="p-4 font-semibold text-gray-700 border-b border-gray-200">
                Select Animal Type
              </div>
              <ul className="py-2">
                {animalTypes.map((animalType) => (
                  <li
                    key={animalType}
                    className={`px-4 py-3 cursor-pointer flex justify-between items-center ${
                      selectedAnimal === animalType
                        ? "bg-white text-petflow-blue font-bold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      if (animalType !== "all") {
                        toggleSubmenu(animalType);
                      } else {
                        handleSelect("all");
                      }
                    }}
                  >
                    <span className="capitalize">
                      {animalType === "all" ? "All Animals" : animalType}
                    </span>
                    {animalType !== "all" && (
                      <svg
                        className="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Submenu content */}
            {openSubmenu &&
              submenuData[openSubmenu as keyof typeof submenuData] && (
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-petflow-blue mb-6">
                    {submenuData[openSubmenu as keyof typeof submenuData].title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {submenuData[
                      openSubmenu as keyof typeof submenuData
                    ].categories.map((category, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
                          {category.name}
                        </h4>
                        <ul className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="text-sm text-gray-600 hover:text-petflow-blue cursor-pointer"
                              onClick={() =>
                                handleSelect(openSubmenu as AnimalType)
                              }
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      className="bg-petflow-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => handleSelect(openSubmenu as AnimalType)}
                    >
                      View All{" "}
                      {
                        submenuData[openSubmenu as keyof typeof submenuData]
                          .title
                      }{" "}
                      Products
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
