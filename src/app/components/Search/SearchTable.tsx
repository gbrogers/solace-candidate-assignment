import { useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";

interface Advocate {
  id: string;
  firstName: string | null;
  lastName: string | null;
  city: string | null;
  degree: string | null;
  specialties: string[];
  yearsOfExperience: number | null;
  phoneNumber: number;
  createdAt: Date;
}

//TODO: this currenly only works for 9 digit phone numbers
const createDashedPhoneNumber = (phoneNumber: number) => {
  const phoneNumberString = String(phoneNumber);
  return (
    phoneNumberString.slice(0, 3) +
    "-" +
    phoneNumberString.slice(3, 6) +
    "-" +
    phoneNumberString.slice(6, 15)
  );
};

const NameCell: React.FC<{ advocate: Advocate }> = ({ advocate }) => {
  // TODO: check the presence of all 3 pieces before constructing. Though api says not null.
  return (
    <td className="border border-slate-600 p-12">
      <p
        className={"font-bold text-[#1d4339]"}
      >{`${advocate.firstName} ${advocate.lastName}, ${advocate.degree}`}</p>
      <p className="text-sm">{advocate.city}</p>
      <p className="text-sm">{createDashedPhoneNumber(advocate.phoneNumber)}</p>
    </td>
  );
};

const SpecialtiesCell: React.FC<{ advocate: Advocate }> = ({ advocate }) => {
  return (
    <td className="border border-slate-600 p-12">
      <ul className="list-disc">
        {advocate.specialties.sort().map((x) => (
          <li className="text-sm" key={x}>
            {x}
          </li>
        ))}
      </ul>
    </td>
  );
};

const ExperienceCell: React.FC<{ advocate: Advocate }> = ({ advocate }) => {
  return (
    <td className="border border-slate-600 p-12">
      {advocate.yearsOfExperience}
    </td>
  );
};

const SearchResults: React.FC<{
  advocateResults: UseQueryResult<Advocate[], Error>;
  handleSort: (column: string) => void;
  sort: {
    column: "years";
    direction: "asc" | "desc";
  } | null;
}> = ({ advocateResults, handleSort, sort }) => {
  if (advocateResults.isLoading) {
    return <div>Loading...</div>;
  }

  if (advocateResults.isError) {
    return <div>{advocateResults.error.message ?? "Error :("}</div>;
  }
  if (!advocateResults.data?.length) {
    return <div>No Results matching your search</div>;
  }

  return (
    <div>
      <p className="text-sm">{`${advocateResults.data.length} Results`}</p>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border border-slate-600 p-6 font-bold">Name</th>
            <th className="border border-slate-600 p-6 font-bold">
              <button onClick={() => handleSort("years")}>
                {/* TODO: clean up this for readability */}
                {`Years of Experience${
                  !!sort
                    ? sort.column === "years"
                      ? sort.direction === "desc"
                        ? " v"
                        : " ^"
                      : ""
                    : ""
                }`}
              </button>
            </th>
            <th className="border border-slate-600 p-6 font-bold">
              Specialties
            </th>
          </tr>
        </thead>
        <tbody>
          {advocateResults.data.map((advocate) => {
            return (
              <tr key={advocate.phoneNumber}>
                <NameCell advocate={advocate} />
                <ExperienceCell advocate={advocate} />
                <SpecialtiesCell advocate={advocate} />
              </tr>
            );
          })}
        </tbody>
      </table>
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

export { SearchResults, Filters };
export type { Advocate };
