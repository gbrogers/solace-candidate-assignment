"use client";

import { AdvocateSearch } from "./components/Search/AdvocateSearch";

export default function Home() {
  return (
    <main>
      <div className="bg-[#1d4339] py-6 px-12">
        <h1 className="text-white font-thin text-3xl">Solace Advocates</h1>
      </div>
      <AdvocateSearch />
    </main>
  );
}
