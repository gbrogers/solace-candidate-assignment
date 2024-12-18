import { SearchResults } from "./SearchTable";
import { useAdvocates } from "@/app/hooks/search";
import { useState } from "react";
import { Filters, Sort } from "./SearchRefinements";

const AdvocateSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [sort, setSort] = useState<{
    column: "years";
    direction: "asc" | "desc";
  } | null>(null);

  const advocateData = useAdvocates({
    query,
    sort,
    filter: filterValue ? { field: "specialty", value: filterValue } : null,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSort = (column: string) => {
    if (column === "years") {
      setSort((prev) => ({
        column,
        direction:
          prev?.column === column && prev?.direction === "asc" ? "desc" : "asc",
      }));
    }
  };

  const handleFilter = (value: string) => {
    setFilterValue(value);
  };
  return (
    <div className="flex flex-col gap-y-8 p-12">
      <h2 className="text-[#1d4339] font-bold text-xl">
        Find Your Patient Advocate Today
      </h2>
      <div className="flex flex-col gap-y-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 p-2 rounded w-full"
          value={query}
          onChange={handleSearch}
        />
        <Filters
          advocateResults={advocateData}
          handleFilter={handleFilter}
          filterValue={filterValue}
        />
        <Sort handleSort={handleSort} />
      </div>
      <SearchResults
        advocateResults={advocateData}
        handleSort={handleSort}
        sort={sort}
      />
    </div>
  );
};

export { AdvocateSearch };
