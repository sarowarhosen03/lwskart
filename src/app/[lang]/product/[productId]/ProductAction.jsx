"use client"

import WishToggleButton from "@/components/ui/WishToggleButton";

export default function ProductAction({ availability, productId }) {
  return (
    <>
      {availability && (
        <div className="mt-4">
          <h3 className="mb-1 text-sm uppercase text-gray-800">Quantity</h3>
          <div className="flex w-max divide-x divide-gray-300 border border-gray-300 text-gray-600">
            <div className="flex h-8 w-8 cursor-pointer select-none items-center justify-center text-xl">
              -
            </div>
            <div className="flex h-8 w-8 items-center justify-center text-base">
              4
            </div>
            <div className="flex h-8 w-8 cursor-pointer select-none items-center justify-center text-xl">
              +
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
        {availability ? (
          <a
            href="#"
            className="flex min-w-fit items-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
          >
            <div className="flex ">
              <i className="fa-solid fa-bag-shopping min-w-fit"></i>
              <p className="min-w-fit text-nowrap">Add to cart</p>
            </div>
          </a>
        ) : (
          <p className="text-xl font-bold">Out Of Stock </p>
        )}

        <WishToggleButton productId={productId} />
      </div>
    </>
  );
}
