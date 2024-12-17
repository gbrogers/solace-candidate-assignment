import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Advocate } from "../components/Search/SearchTable";

interface SearchOptions {
  query: string;
  filter: { field: "specialty"; value: string } | null; // TODO: add filter type - right now only allow $cont
  sort: { column: "years"; direction: "asc" | "desc" } | null;
}

const fetchAdvocates = async (searchOptions: SearchOptions) => {
  const { query, sort, filter } = searchOptions;

  const urlParams = new URLSearchParams();
  if (query) urlParams.set("searchTerm", query);
  if (sort) {
    urlParams.set("sortColumn", sort.column);
    urlParams.set("sortDirection", sort.direction);
  }
  if (filter) {
    urlParams.set("filterField", filter.field);
    urlParams.set("filterValue", filter.value);
  }

  const response = await fetch(`/api/advocates?${urlParams}`);

  if (!response.ok) {
    throw new Error("Error fetching advocates");
  }

  const jsonResponse = await response.json();
  return jsonResponse.data;
};

const useAdvocates = (
  searchOptions: SearchOptions
): UseQueryResult<Advocate[], Error> => {
  return useQuery({
    queryKey: ["advocates", searchOptions],
    queryFn: () => fetchAdvocates(searchOptions),
  });
};

export { useAdvocates };
