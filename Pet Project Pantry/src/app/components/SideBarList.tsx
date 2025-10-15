import { capitalizeFirst } from "../context/helperFunctions";
import { ActiveFilters, Product } from "../types";

interface SideBarListProps {
  filterName: string;
  activeFilters: ActiveFilters;
  copyList: string[] | number[] | null;
  filterChange?: <K extends keyof Product>(field: K, value: Product[K]) => void;
}

const SideBarList = ({
  filterName,
  activeFilters,
  copyList,
  filterChange,
}: SideBarListProps) => {
  const handleDoubleFilterClick = (searchBy: string | number) => {
    console.log("handleDoubleFilterClick searching by: " + searchBy);
    console.log("filterName: " + filterName + " | copyList: ", copyList);
    if (filterChange) {
      console.log("SENDING DATA");
      filterChange(filterName as keyof Product, searchBy);
    }
  };
  return (
    <>
      {copyList && copyList.length > 1 && (
        <div className="sideBar-list" id={`sideBar-list_${filterName}`}>
          <h3
            className="font-semibold text-lg mb-4 border-b pb-2"
            id={`sbfm_h3_${filterName}`}
          >
            Filter {capitalizeFirst(activeFilters.category)} by {filterName}
          </h3>

          <div key={filterName} className="mb-6">
            <ul className="space-y-2">
              {copyList?.map((value, index) => (
                <li key={index}>
                  <button
                    className="w-full text-left px-3 py-2 rounded text-black hover:bg-gray-100"
                    onClick={() => {
                      handleDoubleFilterClick(value);
                    }}
                  >
                    {value}
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
