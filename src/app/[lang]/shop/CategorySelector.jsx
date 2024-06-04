"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function CategorySelector({ name }) {
  const [query, setQuery] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useCallback((event) => {
    const { name, checked } = event.target;

    setQuery((prev) => {
      if (checked) {
        return [...prev, name];
      } else {
        return prev.filter((item) => item !== name);
      }
    });
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");

    if (category) {
      const decodedCategory = decodeURIComponent(category);
      const queryInCategory = decodedCategory.split("|");
      setQuery(queryInCategory);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (query.length > 0) {
      params.set("category", encodeURIComponent(query.join("|")));
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [query, pathname, replace, searchParams]);

  return (
    <input
      onChange={handleChange}
      type="checkbox"
      name={name}
      id={name}
      checked={query.includes(name)}
      className="cursor-pointer rounded-sm text-primary focus:ring-0"
    />
  );
}
