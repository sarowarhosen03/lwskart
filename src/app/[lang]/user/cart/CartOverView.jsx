"use client";
import LocalLink from "@/components/LocalLink";
import CartSkeleton from "@/components/product/CartSkeleton";
import Alert from "@/components/ui/Alert";
import { useAppContext } from "@/context";
import { addToCart, deleteCartItem } from "@/lib/dbQueries/products";
import {
  ADD_CART,
  DELETE_CART,
  SELECTE_CART,
  UPDATE_CART,
} from "@/reducers/appReducer";
import { CartItemStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CartItem from "./CartItems";
let timeoutId;

const CartOverView = ({ lang }) => {
  const {
    state: { isLoading, error, cartList },
    dispatch,
  } = useAppContext();
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [deletingItems, setDeletingItems] = useState([]);
  const { status } = useSession();

  useEffect(() => {
    if (cartList.length > 0) {
      const initialQuantities = cartList.reduce((acc, item) => {
        acc[item.productId] = item.itemCount;
        return acc;
      }, {});
      setQuantities(initialQuantities);
      setSelectedItems(
        cartList
          .filter((item) => item.status === CartItemStatus.AVAILABLE)
          .map((item) => item.productId),
      );
    }
  }, [cartList]);

  const handleSelection = (productId, itemCount, status) => {
    if (itemCount === 0 || status === CartItemStatus.OUT_OF_STOCK) {
      return toast.error("This product is unavailable now.");
    }
    setSelectedItems((prevState) =>
      prevState.includes(productId)
        ? prevState.filter((id) => id !== productId)
        : [...prevState, productId],
    );
  };

  const handleQuantityChange = (productId, quantity, stock) => {
    if (quantity < 1) return;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const cartInfo = cartList.find((item) => item.productId === productId);
    timeoutId = setTimeout(async () => {
      const res = await addToCart(productId, quantity - cartInfo?.itemCount);
      if (res?.success) {
        dispatch({
          type: UPDATE_CART,
          payload: res.payload,
        });
      } else {
        dispatch({
          type: UPDATE_CART,
          payload: cartInfo,
        });
      }
      timeoutId = null;
    }, 1000);
    setQuantities((prevState) => ({
      ...prevState,
      [productId]: Math.min(quantity, stock),
    }));
  };

  const handleContinuePurchase = () => {
    if (selectedItems.length > 0) {
      dispatch({
        type: SELECTE_CART,
        payload: selectedItems,
      });
    } else {
      toast.error("Please select at least one item to continue purchase");
    }
  };

  const handleDeleteItem = async (cartId, productId) => {
    setDeletingItems((prev) => [...prev, productId]);
    const prevData = structuredClone(
      cartList.find((item) => item.id === cartId),
    );
    try {
      const res = await deleteCartItem(cartId);
      if (res?.success) {
        setTimeout(() => {
          dispatch({
            type: DELETE_CART,
            payload: productId,
          });
          setDeletingItems((prev) => prev.filter((id) => id !== productId));
        }, 500); // duration of the fade-out effect
      }
    } catch (error) {
      dispatch({
        type: ADD_CART,
        payload: prevData,
      });
      setDeletingItems((prev) => prev.filter((id) => id !== productId));
    }

    setSelectedItems((prevState) => prevState.filter((id) => id !== productId));
    setQuantities((prevState) => {
      const newState = { ...prevState };
      delete newState[productId];
      return newState;
    });
  };
  const carts = cartList.map((item) => (
    <CartItem
      key={item.id}
      item={item}
      selectedItems={selectedItems}
      quantities={quantities}
      handleSelection={handleSelection}
      handleQuantityChange={handleQuantityChange}
      handleDeleteItem={handleDeleteItem}
      deletingItems={deletingItems}
      lang={lang}
    />
  ));
  let isEmpty = cartList.length > 0 && !isLoading && !error;
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        {isLoading ? (
          <>
            <CartSkeleton />
            <CartSkeleton />
            <CartSkeleton />
          </>
        ) : error ? (
          <Alert
            variant="danger"
            message={"Error ocusrd while fetching data"}
          />
        ) : (
          carts
        )}

        {cartList.length > 0 && (
          <button
            onClick={handleContinuePurchase}
            className="mt-4 w-full rounded bg-primary px-4 py-2 text-white"
          >
            Continue Purchase
          </button>
        )}

        {!isEmpty && <EmptyCart />}
      </div>
    </div>
  );
};

function EmptyCart({ lang }) {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="flex w-full  max-w-3xl flex-col rounded-lg bg-white p-6 shadow-lg">
          <i className="fa-solid fa-cart-flatbed-suitcase block text-center text-6xl text-primary"></i>
          <h1 className=" text-center text-2xl">Your cart is empty</h1>
          <LocalLink
            href={`/shop`}
            className="mt-4 w-full rounded bg-primary px-4 py-2 text-center text-white"
          >
            Shop now
          </LocalLink>
        </div>
      </div>
    </>
  );
}

export default CartOverView;
