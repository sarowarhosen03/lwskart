"use client";
import { getWishAndCartCount } from "@/lib/dbQueries/userQuery";
import appReducer, {
    ADD_TO_CART,
    TOGGLE_WISH,
    appInitialState
} from "@/reducers/appReducer";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useReducer } from "react";

const AppContext = createContext({});

export default function AppContextProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, appInitialState);
    const { status, data: session } = useSession();
    useEffect(() => {
        let ignore = true;

        (async () => {
            if (status === "authenticated") {
                const WishAndCartCount = await getWishAndCartCount(session.user.id);
                if (ignore) {
                    dispatch({
                        type: TOGGLE_WISH,
                        payload: WishAndCartCount.wishCount,
                    });
                    dispatch({
                        type: ADD_TO_CART,
                        payload: WishAndCartCount.cartItemCount,
                    });
                }
            }
        })();

        return () => (ignore = false);
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
