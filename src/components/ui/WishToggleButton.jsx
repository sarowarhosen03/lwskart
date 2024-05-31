"use client";

import { useAppContext } from "@/context";
import { toggleWishItem } from "@/lib/dbQueries/userQuery";
import { TOGGLE_WISH } from "@/reducers/appReducer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function WishToggleButton({ wishItem, productId }) {
    const [wishListed, setWishListed] = useState(false);
    const { status, data: session } = useSession();
    const { dispatch } = useAppContext();
    useEffect(() => {
        if (session?.user) {
            setWishListed(wishItem.find((wish) => wish.userId === session?.user?.id));
        }
    }, [wishListed, setWishListed, wishItem, session]);

    const handleToggleWish = async () => {
        const previousWish = wishListed;
        setWishListed(!previousWish);
        dispatch({
            type: TOGGLE_WISH,
            payload: !previousWish ? 1 : -1,
        });

        try {
            await toggleWishItem(productId);
        } catch (error) {
            // Revert UI state and dispatch if the request fails
            setWishListed(previousWish);
            dispatch({
                type: TOGGLE_WISH,
                payload: previousWish ? 1 : -1,
            });
        }
    };

    return (
        <button
            onClick={handleToggleWish}
            className={`flex items-center gap-2 rounded border border-gray-300 px-8 py-2 font-medium uppercase  transition ${wishListed ? "bg-primary text-white" : "flex items-center gap-2 rounded border border-gray-300 px-8 py-2 font-medium uppercase  transition"}`}
        >
            <i className="fa-solid fa-heart"></i> Wishlist
        </button>
    );
}
