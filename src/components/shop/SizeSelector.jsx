"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SizeSelector({ sizes, sidebarDict }) {
  const searchParams = useSearchParams();
  let selectedParam = searchParams.get("size");
  const router = useRouter();
  if (!selectedParam) selectedParam = "all";
  function handleSelect(e) {
    const params = new URLSearchParams(searchParams.toString());
    const sizeParam = params.get("size");
    params.set("size", e.target.value);
    router.replace(`/shop?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
        {sidebarDict.Size}
      </h3>
      <div className="flex items-center gap-2">
        <div className="size-selector">
          <input
            onChange={handleSelect}
            type="radio"
            name="size"
            id={`size-${"all"}`}
            value={"all"}
            className="hidden"
            checked={selectedParam === "all"}
          />
          <label
            htmlFor={`size-${"all"}`}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm"
          >
            {sidebarDict.allSize}
          </label>
        </div>
        {sizes?.map((size, i) => (
          <div key={i} className="size-selector">
            <input
              onChange={handleSelect}
              type="radio"
              name="size"
              id={`size-${size}`}
              value={size}
              className="hidden"
              checked={selectedParam === size}
            />
            <label
              htmlFor={`size-${size}`}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm"
            >
              {size}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
