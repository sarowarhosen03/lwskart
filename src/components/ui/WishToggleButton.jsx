"use client";

import useWish from "@/hooks/useWish";

export default function WishToggleButton({ productId }) {
    const [handleToggleWish, wishListed] = useWish(productId)
    return (
        <button
            onClick={handleToggleWish}
            className={`flex items-center gap-2 rounded border border-gray-300 px-8 py-2 font-medium uppercase transition ${wishListed ? "bg-primary text-white" : "bg-white text-primary"}`}
        >
            <i className="fa-solid fa-heart"></i> Wishlist
        </button>
    );
}
