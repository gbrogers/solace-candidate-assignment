"use client";

import { useState } from "react";
import { useAdvocates } from "./hooks/search";
import { Filters, SearchResults } from "./components/Search/SearchTable";

export default function Home() {
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
    <main>
      <div className="bg-[#1d4339] p-6">
        <h1 className="text-white font-thin  text-3xl">Solace Advocates</h1>
      </div>
      <div className=" p-12">
        <br />
        <h2 className="text-[#1d4339] font-bold text-xl">
          Find Your Patient Advocate Today
        </h2>
        <br />
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 p-2 rounded w-full"
          value={query}
          onChange={handleSearch}
        />
        <br />
        <br />
        <Filters
          advocateResults={advocateData}
          handleFilter={handleFilter}
          filterValue={filterValue}
        />
        <br />
        <SearchResults
          advocateResults={advocateData}
          handleSort={handleSort}
          sort={sort}
        />
      </div>
    </main>
  );
}
