
import { useAppContext } from "@/context";
import { toggleWishItem } from "@/lib/dbQueries/userQuery";
import { TOGGLE_WISH_LIST } from "@/reducers/appReducer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function useWish(productId) {

    const [wishListed, setWishListed] = useState(false);
    const { data: session } = useSession();
    const {
        dispatch,
        state: { wishList },
    } = useAppContext();

    // Effect to update wishListed state based on wishList changes
    useEffect(() => {
        if (session?.user) {
            const isWishListed = wishList.includes(productId);
            if (isWishListed !== wishListed) {
                setWishListed(isWishListed);
            }
        }
    }, [wishList, session, productId, wishListed]);

    const handleToggleWish = async () => {
        dispatch({
            type: TOGGLE_WISH_LIST,
            payload: productId,
        });

        try {
            await toggleWishItem(productId);
        } catch (error) {
            dispatch({
                type: TOGGLE_WISH_LIST,
                payload: productId,
            });
        }

    }

    return [handleToggleWish, wishListed]
}
