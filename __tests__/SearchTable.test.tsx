import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Advocate, SearchResults } from "../src/app/components/Search/SearchTable";
import { UseQueryResult } from "@tanstack/react-query";

const FAKE_ADVOCATE_DATA = 
 [
    {
      id: "1", 
      firstName: "John",
      lastName: "Doe",
      city: "New York",
      degree: "MD",
      specialties: ["Pediatrics"],
      yearsOfExperience: 10,
      phoneNumber: 5551234567,
    },
    {
      id: "2", 
      firstName: "Jane",
      lastName: "Smith",
      city: "Los Angeles",
      degree: "PhD",
      specialties: ["LGBTQ", "Pediatrics"],
      yearsOfExperience: 8,
      phoneNumber: 5559876543,
    },
   ]


const FAKE_ADVOCATE_RESULTS = {
  data: FAKE_ADVOCATE_DATA,
  isLoading: false,
  isError: false,
  error: null,
};

const FAKE_ADVOCATE_LOADING = {
  data: FAKE_ADVOCATE_DATA,
  isLoading: true,
  isError: false,
  error: null,
};

const FAKE_ADVOCATE_NO_RESULTS = {
  data: [],
  isLoading: false,
  isError: false,
  error: null,
};


describe("SearchResults", () => {
  it("renders advocate results",async  () => {
    render(
      <SearchResults
        advocateResults={
          FAKE_ADVOCATE_RESULTS as unknown as UseQueryResult<Advocate[], Error>
        }
     
      />
    );

    expect(await screen.findByText("John Doe, MD")).toBeInTheDocument();
    expect(await screen.findByText("Jane Smith, PhD")).toBeInTheDocument();
  });

  it("renders loading state when query loading",async  () => {
    render(
      <SearchResults
        advocateResults={
          FAKE_ADVOCATE_LOADING as unknown as UseQueryResult<Advocate[], Error>
        }
     
      />
    );

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect( screen.queryByText("Jane Smith, PhD")).not.toBeInTheDocument();
  });

  it("renders no results message when no advocates matching search",async  () => {
    render(
      <SearchResults
        advocateResults={
          FAKE_ADVOCATE_NO_RESULTS as unknown as UseQueryResult<Advocate[], Error>
        }
     
      />
    );

    expect(await screen.findByText("No results matching your search")).toBeInTheDocument();
  });
});
