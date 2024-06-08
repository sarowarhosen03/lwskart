"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function PriceSelector({ sidebarDict }) {
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const { replace } = useRouter();
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    if (name === "min") {
      setMin(value);
    } else {
      setMax(value);
    }
  }, []);
  useEffect(() => {
    if (price) {
      const [min, max] = price.split("|");
      setMin(min);
      setMax(max);
    }
  }, [price]);

  function handleChangeValue(event) {
    const { name, value } = event.target;
    if (value === min || value === max) return;
    if (value < max) return;
    handleChange(event);
  }
  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
        {sidebarDict.price}
      </h3>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          name="min"
          id="min"
          value={min}
          onChange={handleChangeValue}
          className="w-full rounded border-gray-300 px-3 py-1 text-gray-600 shadow-sm focus:border-primary focus:ring-0"
          placeholder="min"
        />
        <span className="mx-3 text-gray-500">-</span>
        <input
          type="text"
          name="max"
          id="max"
          value={max}
          onChange={handleChangeValue}
          className="w-full rounded border-gray-300 px-3 py-1 text-gray-600 shadow-sm focus:border-primary focus:ring-0"
          placeholder="max"
        />
        <button
          className="mx-2s bg-primary p-1 text-white"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            if (min && max) {
              params.set("price", `${min}|${max}`);
            } else {
              params.delete("price");
            }
            replace(`?${params.toString()}`);
          }}
        >
          {sidebarDict.filter}
        </button>
      </div>
    </div>
  );
}
