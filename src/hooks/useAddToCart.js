import { useAppContext } from "@/context";
import { addToCart } from "@/lib/dbQueries/products";
import { ADD_TO_CART } from "@/reducers/appReducer";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

export default function useAddToCart(productId, availability, quantity = 1) {

  const { dispatch, state: { cartList } } = useAppContext();
  const [hasMore, setHasMore] = useState(availability);
  const [data, setData] = useState(null);
  const [isPending, startTransition] = useTransition();
  const isOnCart = cartList.find(cart => cart === productId);
  async function handelAddToCart() {
    startTransition(async () => {
      try {
        const response = await addToCart(productId, quantity);
        if (response?.success) {
          dispatch({
            type: ADD_TO_CART,
            payload: productId,
          });
          setData(response)
          toast.success("Added to Cart successfully");
          setHasMore(response.data.availability);
        }
        if (response.error) {
          throw Error(response?.message)
        }
      } catch (error) {

        if (error) {
          toast.error("failed to add item into cart");
        }
      }
    });
  }

  return { hasMore, handelAddToCart, isPending, data, isOnCart }
}
