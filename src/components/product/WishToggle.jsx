"use client";
import { useAppContext } from "@/context";
import { toggleWishItem } from "@/lib/dbQueries/userQuery";
import { TOGGLE_WISH } from "@/reducers/appReducer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function WishToggle({ wishList, productId }) {
    const { status, data: session } = useSession();
    const [favorite, setFavorite] = useState(false);
    const { dispatch } = useAppContext();

    useEffect(() => {
        if (status === "authenticated") {
            const id = session.user.id;
            setFavorite(wishList.includes(id));
        }
    }, [status, session?.user?.id, wishList]);

    const handleToggleWish = async () => {
        const previousFavorite = favorite;
        setFavorite(!previousFavorite);
        dispatch({
            type: TOGGLE_WISH,
            payload: !previousFavorite ? 1 : -1,
        });

        try {
            await toggleWishItem(productId);
        } catch (error) {
            // Revert UI state and dispatch if the request fails
            setFavorite(previousFavorite);
            dispatch({
                type: TOGGLE_WISH,
                payload: previousFavorite ? 1 : -1,
            });
        }
    };

    return (
        <button
            onClick={handleToggleWish}
            className={`flex h-8 w-9 items-center justify-center rounded-full transition ${favorite ? "bg-primary text-white" : "bg-white text-primary"} text-lg`}
            title={favorite ? "Remove From WishList" : "Add To WishList"}
        >
            <i className={`fa-solid fa-heart ${favorite ? "text-white" : "text-primary"}`}></i>
        </button>
    );
}
