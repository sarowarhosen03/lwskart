"use client";

import useAddToCart from "@/hooks/useAddToCart";
import { redirectFromServer } from "@/lib/actions/redirect";
import { useState } from "react";

export default function AddToCartBtn({ productId, availability }) {
    const preVious = availability;
    const [isIntStock] = useState(availability)
    const { hasMore, handelAddToCart, isPending } = useAddToCart(
        productId,
        availability,
    );



    if (preVious && !hasMore) {
        return (
            <button onClick={() => {
                redirectFromServer("/checkout", ['/'])
            }}
                className="block w-full cursor-not-allowed rounded-b border border-primary bg-primary py-1 text-center text-white"
            >
                Proceed to Checkout
            </button>
        );
    }

    if (!isIntStock) {
        return (
            <button
                disabled={true}
                className="block w-full cursor-not-allowed rounded-b border border-primary bg-slate-500 py-1 text-center text-white"
            >
                Out of stock
            </button>
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
