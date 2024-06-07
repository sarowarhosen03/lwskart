import { useAppContext } from "@/context";
import { toggleWishItem } from "@/lib/dbQueries/userQuery";
import { TOGGLE_WISH_LIST } from "@/reducers/appReducer";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function useWish(productId, skip = false) {
  const [wishListed, setWishListed] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const {
    dispatch,
    state: { wishList },
  } = useAppContext();
  const { push } = useRouter();
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
      const res = await toggleWishItem(productId, pathname, skip);
      if (res?.status === "ok") {
        toast.success(res?.message);
      }
      if (res?.redirect) {
        push(res.redirect);
      }
    } catch (error) {
      dispatch({
        type: TOGGLE_WISH_LIST,
        payload: productId,
      });
    }
  };

  return [handleToggleWish, wishListed];
}
