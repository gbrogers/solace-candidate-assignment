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

const AdvocateInfo: React.FC<{ advocate: Advocate }> = ({ advocate }) => {
  // TODO: check the presence of all 3 pieces before constructing. Though api says not null.
  return (
    <div className="p-12 w-1/4">
      <p
        className={"font-bold text-[#1d4339]"}
      >{`${advocate.firstName} ${advocate.lastName}, ${advocate.degree}`}</p>
      <p className="text-sm">{advocate.city}</p>
      <p className="text-sm">{createDashedPhoneNumber(advocate.phoneNumber)}</p>
      <p className="text-xs text-gray-600 italic">
        <br />
        <b>{advocate.yearsOfExperience}</b> Years of Experience
      </p>
    </div>
  );
};

const SpecialtiesList: React.FC<{ advocate: Advocate }> = ({ advocate }) => {
  return (
    <div className="p-12">
      <p className="text-sm text-gray-700">Specialties</p>
      <ul className="list-disc pl-4">
        {advocate.specialties.sort().map((x) => (
          <li className="text-sm" key={x}>
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ResultCard: React.FC<{
  advocate: Advocate;
}> = ({ advocate }) => {
  return (
    <div className="shadow-md rounded-xl  border border-slate-600 w-full flex flex-row">
      <AdvocateInfo advocate={advocate} />
      <SpecialtiesList advocate={advocate} />
    </div>
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
      <p className="text-sm pb-2">{`${advocateResults.data.length} Results`}</p>
      <div className="flex flex-col ... gap-4">
        {advocateResults.data.map((advocate) => (
          <ResultCard key={advocate.id} advocate={advocate} />
        ))}
      </div>
    </div>
  );
};

export { SearchResults };
export type { Advocate };
