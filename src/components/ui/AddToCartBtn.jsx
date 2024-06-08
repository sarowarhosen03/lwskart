"use client";

import useAddToCart from "@/hooks/useAddToCart";
import { useRouter } from "next/navigation";

export default function AddToCartBtn({
  productId,
  availability,
  stock,
  isLoading,
  productDict: { addToCart, stockOut, showCart },
}) {
  const { handleAddToCart, isPending, isOnCart } = useAddToCart(
    productId,
    availability,
  );
  const { push } = useRouter();
  if (!availability && !isOnCart && !stock > 0) {
    return (
      <button
        disabled={true}
        className="block w-full cursor-not-allowed rounded-b border border-primary bg-slate-500 py-1 text-center text-white"
      >
        {stockOut}
      </button>
    );
  }
  if (isOnCart) {
    return (
      <button
        disabled={isLoading}
        onClick={async () => push("/user/cart")}
        className="block w-full cursor-pointer rounded-b border border-primary bg-orange-400 py-1 text-center text-white disabled:bg-red-400"
      >
        {showCart}
      </button>
    );
  }

  return (
    <button
      disabled={isPending}
      onClick={handleAddToCart}
      className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary disabled:bg-red-400 disabled:text-white"
    >
      {addToCart}
    </button>
  );
}
