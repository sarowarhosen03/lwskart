"use client";

import QuantityCounter from "@/components/ui/QuantityCounter";
import WishToggleButton from "@/components/ui/WishToggleButton";
import useAddToCart from "@/hooks/useAddToCart";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function ProductAction({
  availability,
  productId,
  stock,
  productdict: {
    addToCart,
    stockOut,
    showCart,
    wishlistTitleAdd,
    wishlistTitleRemove,
  },
}) {
  const [quantity, setQuantity] = useState(1);
  const [availableStock, setAvailableStock] = useState(stock);
  const { handleAddToCart, isPending, isOnCart } = useAddToCart(
    productId,
    availability,
    quantity,
  );
  const { status } = useSession();
  const handleAddCart = useCallback(async () => {
    await handleAddToCart(quantity);
    setAvailableStock((prev) => prev - quantity);
    setQuantity(1);
  }, [quantity, handleAddToCart]);
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
        {availability || isOnCart ? (
          <button
            disabled={isPending || availableStock == 0 || !availability}
            onClick={handleAddCart}
            className="flex min-w-fit items-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary disabled:bg-red-300 disabled:text-white"
          >
            <div className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-bag-shopping min-w-fit"></i>
              <p className="min-w-fit text-nowrap">Add to cart</p>
            </div>
          </button>
        ) : (
          <p className="text-xl font-bold">{stockOut}</p>
        )}

        <WishToggleButton
          productId={productId}
          productdict={{ wishlistTitleAdd, wishlistTitleRemove }}
        />
      </div>
      {status === "authenticated" && isOnCart && (
        <Link
          href={`/user/cart`}
          className="block bg-orange-400 px-4 py-3 text-center font-bold text-white"
        >
          {" "}
          {showCart}
        </Link>
      )}
    </>
  );
}
