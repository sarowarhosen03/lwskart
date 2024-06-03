"use client";
import { getWishAndCartCount } from "@/lib/dbQueries/userQuery";
import appReducer, {
  LOAD_RESULT,
  ON_ERROR,
  ON_LOADING,
  appInitialState,
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
        if (!ignore) {
          try {
            dispatch({
              type: ON_LOADING,
            });

            const { wishList, cartItemList } = await getWishAndCartCount(
              session.user.id,
            );
            dispatch({
              type: LOAD_RESULT,
              payload: {
                wishList,
                cartList: cartItemList,
              },
            });
          } catch (error) {
            dispatch({
              type: ON_ERROR,
              payload: error,
            });
          }
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
