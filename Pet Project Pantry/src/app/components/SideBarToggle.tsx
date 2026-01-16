import { capitalizeFirst } from "../context/helperFunctions";
import { ActiveFilters } from "../types";

interface ToggleOption<T extends string | number> {
  label: string;
  value: T;
}

interface SideBarToggleProps<T extends string | number> {
  filterName: string;
  title?: string;
  activeFilters: ActiveFilters;
  options: ToggleOption<T>[];
  onChange: (value: T) => void;
}

const SideBarToggle = <T extends string | number>({
  filterName,
  title,
  activeFilters,
  options,
  onChange,
}: SideBarToggleProps<T>) => {
  const copyList = activeFilters[filterName as keyof ActiveFilters] as T[];

  const handleClick = (value: T) => {
    console.log(`Toggling ${filterName} with value: ${value}`);
    onChange(value);
  };

  const pluralize = (word: string): string => {
    if (word.toLowerCase().endsWith("s")) return word;
    return word + "s";
  };

  const categoryName = activeFilters.category
    ? capitalizeFirst(pluralize(activeFilters.category))
    : "Items";

  const headerText =
    title || `Filter ${categoryName} by ${capitalizeFirst(filterName)}`;

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
