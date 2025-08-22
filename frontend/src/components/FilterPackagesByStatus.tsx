import type { Dispatch } from "react";
import type { FilterStatusOptions } from "../pages/Packages";
import type React from "react";

const statusOptions = [
  "All",
  "Created",
  "Sent",
  "Accepted",
  "Returned",
  "Canceled",
];

type FilterPackageByStatus = {
  selectedStatus: FilterStatusOptions;
  setSelectedStatus: Dispatch<React.SetStateAction<FilterStatusOptions>>;
};

const FilterPackagesByStatus = ({
  selectedStatus,
  setSelectedStatus,
}: FilterPackageByStatus) => {
  return (
    <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value as FilterStatusOptions)}
      className="px-8 text-slate-900 bg-slate-300 outline-none"
    >
      {statusOptions.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};

export default FilterPackagesByStatus;
