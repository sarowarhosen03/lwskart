"use client";
import { getWishAndCartCount } from "@/lib/dbQueries/userQuery";
import appReducer, {
    LOAD_CART_LIST,
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
                const { cartItemCount, wishList, cartItemList } = await getWishAndCartCount(session.user.id);
                if (!ignore) {
                    dispatch({
                        type: LOAD_WISH_LIST,
                        payload: wishList
                    });

                    dispatch({
                        type: LOAD_CART_LIST,
                        payload: cartItemList
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
