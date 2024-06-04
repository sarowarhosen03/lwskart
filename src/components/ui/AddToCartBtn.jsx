"use client";

import useAddToCart from "@/hooks/useAddToCart";
import Link from "next/link";

export default function AddToCartBtn({ productId, availability, stock }) {
  const { handelAddToCart, isPending, isOnCart } = useAddToCart(
    productId,
    availability,
  );

  if (!availability && !isOnCart && stock > 0) {
    return (
      <button
        disabled={true}
        className="block w-full cursor-not-allowed rounded-b border border-primary bg-slate-500 py-1 text-center text-white"
      >
        Out of stock
      </button>
    );
  }
  if (!availability && isOnCart) {
    return (
      <Link
        href={`/checkout`}
        className="block w-full cursor-not-allowed rounded-b border border-primary bg-orange-400 py-1 text-center text-white"
      >
        Proceed To Checkout
      </Link>
    );
  }

  return (
    <button
      disabled={isPending}
      onClick={handelAddToCart}
      className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary disabled:bg-red-400 disabled:text-white"
    >
      Add to cart
    </button>
  );
}
