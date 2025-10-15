import { capitalizeFirst } from "../context/helperFunctions";
import { ActiveFilters, Product } from "../types";

interface ToggleOption {
  label: string;
  value: string | number;
}

interface SideBarToggleProps<T extends string | number> {
  filterName: string;
  title?: string;
  activeFilters: ActiveFilters;
  copyList: T[] | null;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}

const SideBarToggle = <T extends string | number>({
  filterName,
  activeFilters,
  copyList,
  options,
  onChange,
}: SideBarToggleProps<T>) => {
  const handleClick = (value: T) => onChange(value);

  // ✅ Helper: pluralize words naturally
  const pluralize = (word: string): string => {
    // If it already ends in 's', assume plural (e.g. "toys")
    if (word.toLowerCase().endsWith("s")) return word;
    // Simple pluralization rule: add 's'
    return word + "s";
  };

  // ✅ Header logic
  const categoryName = activeFilters.category
    ? capitalizeFirst(pluralize(activeFilters.category))
    : "Items";

  const headerText = `Filter ${categoryName} by ${capitalizeFirst(filterName)}`;

  return (
    <>
      {copyList && copyList.length > 1 && (
        <div className="sideBar-list" id={`sideBar-list_${filterName}`}>
          <h3 className="font-semibold text-lg mb-4 border-b pb-2">
            {headerText}
          </h3>
          <div className="mb-6">
            <ul className="space-y-2">
              {options.map((opt, i) => (
                <li key={i}>
                  <button
                    className="w-full text-left px-3 py-2 rounded text-black hover:bg-gray-100"
                    onClick={() => handleClick(opt.value)}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBarToggle;
