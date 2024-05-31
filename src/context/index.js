"use client";
import { getWishAndCartCount } from "@/lib/dbQueries/userQuery";
import appReducer, {
    ADD_TO_CART,
    LOAD_WISH_LIST,
    appInitialState
} from "@/reducers/appReducer";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useReducer } from "react";

const AppContext = createContext({});

export default function AppContextProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, appInitialState);
    const { status, data: session } = useSession();

    useEffect(() => {
        let ignore = false;

        (async () => {
            if (status === "authenticated") {
                const WishAndCartCount = await getWishAndCartCount(session.user.id);
                if (!ignore) {

                    dispatch({
                        type: ADD_TO_CART,
                        payload: WishAndCartCount.cartItemCount,
                    });
                    dispatch({
                        type: LOAD_WISH_LIST,
                        payload: WishAndCartCount.wishList,
                    });
                }
            }
        })();

        return () => {
            ignore = true;
        };
    }, [status, session]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
};
