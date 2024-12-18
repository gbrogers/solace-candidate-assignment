import { UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";
import { Advocate } from "./SearchTable";

const Sort: React.FC<{ handleSort: (column: string) => void }> = ({
  handleSort,
}) => {
  return (
    <div className="gap-2 flex">
      <input
        type="checkbox"
        id="years-sort"
        name="years-sort"
        value="years-sort"
        onChange={() => {
          handleSort("years");
        }}
      />
      <label>Sort By Years of Experience</label>
    </div>
  );
};

const Filters: React.FC<{
  advocateResults: UseQueryResult<Advocate[], Error>;
  handleFilter: (value: string) => void;
  filterValue: string | null;
}> = ({ advocateResults, handleFilter, filterValue }) => {
  const allSpecialties = useMemo(() => {
    //To avoid null results, we only use the available specialties in current search result.
    //Would need to talk to customers if better to have full list at all times.
    if (!advocateResults.isLoading && filterValue !== "none") {
      return Array.from(
        new Set(
          advocateResults.data
            ?.flatMap((advocate) => advocate?.specialties)
            .sort()
        )
      );
    } else {
      return [filterValue];
    }
  }, [advocateResults.data, advocateResults.isLoading, filterValue]);

  return (
    <div>
      <label htmlFor="specialty">Filter by Specialty: </label>
      <select
        name="specialty"
        id="specialty"
        className="border border-gray-300 p-2 rounded"
        value={filterValue ?? ""}
        onChange={(e) => {
          const selectedValue =
            e.target.value === "none" ? null : e.target.value;
          handleFilter(selectedValue ?? "");
        }}
      >
        <option value="none">None</option>
        {allSpecialties.map((specialty) => (
          <option
            key={specialty}
            value={specialty ?? "unknown"}
            id={specialty ?? "unknown"}
          >
            {specialty}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Filters, Sort };
