"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductPaginate({
  paginate: { page, limit, pageCount, total },
  limitDict,
}) {
  const pathName = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  function handleSwitch(pageNo) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNo.toString());
    replace(`${pathName}?${params.toString()}`);
  }
  function handleChangeLimit(limit) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", limit);
    replace(`${pathName}?${params.toString()}`);
  }
  return (
    <div className="my-2 flex items-center justify-between rounded-md bg-gray-100 px-4 py-2">
      <div>
        <p>
          Showing {page} to {limit} of {total} ({pageCount} Pages)
        </p>
      </div>
      <div>
        <ul
          className="pagination-container flex gap-2"
          role="navigation"
          aria-label="Pagination"
        >
          {page > 1 && (
            <li className="page-item">
              <button
                onClick={() => handleSwitch(page - 1)}
                className="bg-primary px-4 py-2 text-white"
              >
                Previous
              </button>
            </li>
          )}
          {Array(Math.min(pageCount, 5))
            .fill(null)
            .map((_, i) => (
              <li key={i} className="page-item">
                <button
                  onClick={() => handleSwitch(i + 1)}
                  className={`border-2 border-primary px-2 py-1 text-primary ${
                    page === i + 1
                      ? "bg-primary text-white"
                      : "hover:bg-primary hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          {pageCount > 5 && (
            <>
              {page + 2 < pageCount && (
                <li className="page-item">
                  <p className="px-2 py-1">...</p>
                </li>
              )}
              <li className="page-item">
                <button
                  onClick={() => handleSwitch(pageCount)}
                  className="border-2 border-primary px-2 py-1 text-primary hover:bg-primary hover:text-white"
                >
                  {pageCount}
                </button>
              </li>
            </>
          )}
          {page < pageCount && (
            <li className="page-item">
              <button
                onClick={() => handleSwitch(page + 1)}
                className="bg-primary px-4 py-2 text-white"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </div>
      <div>
        <div>
          <label htmlFor="limit" className="mr-2 text-gray-700">
            {limitDict}:
          </label>
          <select
            id="limit"
            className="rounded border border-gray-300 px-8 py-1"
            value={limit}
            onChange={(e) => {
              handleChangeLimit(e.target.value);
            }}
          >
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
