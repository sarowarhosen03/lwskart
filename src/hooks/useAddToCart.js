import { useAppContext } from "@/context";
import { addToCart } from "@/lib/dbQueries/products";
import { UPDATE_CART } from "@/reducers/appReducer";
import { CartItemStatus } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

export default function useAddToCart(productId, availability, quantity = 1) {
  const {
    dispatch,
    state: { cartList },
  } = useAppContext();
  const pathName = usePathname();

  const [hasMore, setHasMore] = useState(availability);
  const [data, setData] = useState(null);
  const [isPending, startTransition] = useTransition();
  const { push, refresh } = useRouter();
  const isOnCart = cartList.find(
    (cart) =>
      cart.productId === productId && cart.status === CartItemStatus.available,
  );
  async function handleAddToCart() {
    startTransition(async () => {
      try {
        const response = await addToCart(productId, quantity, pathName);
        refresh();
        if (response?.success) {
          dispatch({
            type: UPDATE_CART,
            payload: response.payload,
          });
          setData(response);
          toast.success("Added to Cart successfully");
          setHasMore(response.data.availability);
        }
        if (response?.redirect) {
          toast.info(`Please login to Continue`);
          return push(response.redirect);
        }
        if (response.error) {
          throw Error(response?.message);
        }
      } catch (error) {
        if (error) {
          toast.error("failed to add item into cart");
        }
      }
    });
  }

  return { hasMore, handleAddToCart, isPending, data, isOnCart };
}
