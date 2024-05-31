"use client";

import QuantityCounter from "@/components/ui/QuantityCounter";
import WishToggleButton from "@/components/ui/WishToggleButton";
import useAddToCart from "@/hooks/useAddToCart";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function ProductAction({ availability, productId, stock }) {
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [availableStock, setAvailableStock] = useState(stock);
  const { hasMore, handelAddToCart, isPending } = useAddToCart(
    productId,
    availability,
  );
  const { status } = useSession();

  const handleAddToCart = useCallback(async () => {
    setAdded(true);
    console.log(quantity);
    await handelAddToCart(quantity);
    setAvailableStock((prev) => prev - quantity);
  }, [quantity, handelAddToCart]);

  return (
    <>
      {availability && (
        <QuantityCounter
          quantity={quantity}
          setQuantity={setQuantity}
          stock={availableStock}
        />
      )}

      <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
        {availability ? (
          <button
            disabled={isPending || availableStock <= 0}
            onClick={handleAddToCart}
            className="flex min-w-fit items-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary disabled:bg-red-300 disabled:text-white"
          >
            <div className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-bag-shopping min-w-fit"></i>
              <p className="min-w-fit text-nowrap">Add to cart</p>
            </div>
          </button>
        ) : (
          <p className="text-xl font-bold">Out Of Stock</p>
        )}

        <WishToggleButton productId={productId} />
      </div>
      {status === "authenticated" && added && (
        <Link
          href={`/checkout`}
          className="block bg-orange-400 px-4 py-3 text-center font-bold text-white"
        >
          {" "}
          Processed To Checkout
        </Link>
      )}
    </>
  );
}
