"use client";
import { useAppContext } from "@/context";
import { addToCart } from "@/lib/dbQueries/products";
import { ADD_TO_CART } from "@/reducers/appReducer";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

export default function AddToCartBtn({ productId, availability }) {
    const { dispatch } = useAppContext();
    const [hasMore, setHasMore] = useState(availability);
    const [isPending, startTransition] = useTransition();
    async function handelAddToCart() {
        startTransition(async () => {
            try {
                const response = await addToCart(productId);
                if (response?.success) {
                    dispatch({
                        type: ADD_TO_CART,
                        payload: response.data.quantity,
                    });
                    toast.success("Added to Cart successfully");

                    setHasMore(response.data.availability);
                }
                if (response.error) {
                    throw Error(response?.message)
                }
            } catch (error) {
                if (error) {
                    toast.error("failed to add item into cart");
                }
            }
        });
    }

    if (!hasMore) {
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
