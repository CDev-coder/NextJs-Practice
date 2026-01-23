import { ActiveFilters, Product } from "../../types";

interface SideBarListProps {
  filterName: string;
  filterby?: string;
  activeFilters?: ActiveFilters | null;
  filterChange?: <K extends keyof Product>(field: K, value: Product[K]) => void;
}

const SideBarList = ({
  filterName,
  filterby,
  activeFilters,
  filterChange,
}: SideBarListProps) => {
  if (!activeFilters) {
    return null; // Or handle the null case appropriately, e.g., return an empty div
  }
  const rawValue = activeFilters
    ? activeFilters[filterby as keyof ActiveFilters]
    : undefined;

  const copyList: Array<string | number> = Array.isArray(rawValue)
    ? rawValue.filter(
        (v): v is string | number =>
          typeof v === "string" || typeof v === "number",
      )
    : [];
  //console.log("SIDEBARLIST - rawValue: ", rawValue);
  //console.log("SIDEBARLIST - copyList: ", copyList);

  const handleDoubleFilterClick = (searchBy: string | number) => {
    //console.log("handleDoubleFilterClick searching by: " + searchBy);
    //console.log("filterName: " + filterName + " | copyList: ", copyList);
    if (filterChange) {
      //console.log("SENDING DATA");
      filterChange(filterName as keyof Product, searchBy);
    }
  };
  return (
    <>
      {copyList && copyList.length > 1 && (
        <div className="sideBar-list mb-8" id={`sideBar-list_${filterName}`}>
          <h3 className=" font-bold text-sm uppercase tracking-[0.2em] mb-4">
            {filterName}
          </h3>

          <div key={filterName}>
            <ul className="space-y-1">
              {copyList.map((value, index) => (
                <li key={index} className="group/item">
                  <button
                    className="w-full text-left px-3 py-1.5 -ml-3 rounded-xl text-stone-600 hover:text-navbar-text2 hover:bg-orange-100/40 transition-all duration-200 flex items-center"
                    onClick={() => handleDoubleFilterClick(value)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-navbar mr-0 opacity-0 group-hover/item:mr-2 group-hover/item:opacity-100 transition-all duration-300 flex-shrink-0"></span>
                    <span className="tracking-tight">{value}</span>
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
export default SideBarList;
