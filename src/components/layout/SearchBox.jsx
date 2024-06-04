"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBox({ dict }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    replace(`shop/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex w-full max-w-xl">
      <span className="absolute left-4 top-3 text-lg text-gray-400">
        <i className="fa-solid fa-magnifying-glass"></i>
      </span>

      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={handleChange}
        className="hidden w-full rounded-l-md border border-r-0 border-primary py-3 pl-12 pr-3 focus:outline-none md:flex"
        placeholder={dict.search}
      />
      <button className="hidden items-center rounded-r-md border border-primary bg-primary px-8 text-white transition hover:bg-transparent hover:text-primary md:flex">
        {dict.search}
      </button>
    </form>
  );
}
