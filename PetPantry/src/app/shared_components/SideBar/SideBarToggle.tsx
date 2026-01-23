import { capitalizeFirst } from "../../context/helperFunctions";
import { ActiveFilters } from "../../types";

interface ToggleOption<T extends string | number> {
  label: string;
  value: T;
}

interface SideBarToggleProps<T extends string | number> {
  filterby: string;
  title?: string;
  activeFilters?: ActiveFilters | null;
  options: ToggleOption<T>[];
  onChange: (value: T) => void;
}

const SideBarToggle = <T extends string | number>({
  filterby,
  title,
  activeFilters,
  options,
  onChange,
}: SideBarToggleProps<T>) => {
  if (!activeFilters) {
    return null; // Or handle the null case appropriately, e.g., return an empty div
  }
  const filterName = filterby === "filtered_names" ? "Name" : "Price";

  const copyList = activeFilters
    ? activeFilters[filterby as keyof ActiveFilters]
    : undefined;

  //console.log("SIDEBARTOGGLE - rawValue: ", copyList);

  const handleClick = (value: T) => {
    //console.log(`Toggling ${filterby} with value: ${value}`);
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

  const renderLabel = (label: string) => {
    const parts = label.split(/(A|Z|\${1,3})/g);
    return parts.map((part, index) => {
      if (part === "A" || part === "Z" || part.includes("$")) {
        return (
          <span
            key={index}
            className="group-hover/item:text-navbar-text2 transition-colors duration-200"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

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
                <li key={i} className="group/item">
                  <button
                    className="w-full text-left px-3 py-1.5 -ml-3 rounded-xl text-stone-600 hover:bg-orange-100/40 transition-all duration-200 flex items-center"
                    onClick={() => handleClick(opt.value)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-navbar mr-0 opacity-0 group-hover/item:mr-2 group-hover/item:opacity-100 transition-all duration-300 flex-shrink-0"></span>

                    <span className="tracking-tight">
                      {renderLabel(opt.label)}
                    </span>
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
