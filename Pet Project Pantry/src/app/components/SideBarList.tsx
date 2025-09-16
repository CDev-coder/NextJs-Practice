import { capitalizeFirst } from "../context/helperFunctions";
import { ActiveFilters } from "../types";

interface SideBarListProps {
  filterName: string;
  activeFilters: ActiveFilters;
  copyList: string[] | number[] | null;
}

const SideBarList = ({
  filterName,
  activeFilters,
  copyList,
}: SideBarListProps) => {
  console.log("filterName: " + filterName + "copyList: ", copyList);
  const handleDoubleFilterClick = (searchBy: string | number) => {
    console.log("handleDoubleFilterClick searching by: " + searchBy);
  };
  return (
    <>
      {copyList && copyList?.length > 1 && (
        <>
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
        </>
      )}
    </>
  );
};
export default SideBarList;
