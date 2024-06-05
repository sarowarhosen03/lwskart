"use client";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ContactForm from "./ContactForm";
import OrderSummary from "./OrderSummary";

export default function CheckOutSummery({ userInfo }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isSubmitting, startTransition] = useTransition();
  const { push } = useRouter();
  const {
    state: { cartList },
    dispatch,
  } = useAppContext();
  const [selectedCarts, setSelectedCarts] = useState([]);
  useEffect(() => {
    if (localStorage) {
      const selectedProductIds = localStorage.getItem("selectedItems");
      if (selectedProductIds) {
        const selectedItems = JSON.parse(selectedProductIds);
        const items = cartList.filter((item) =>
          selectedItems.includes(item.productId),
        );
        setSelectedCarts(items);
      } else if (!selectedProductIds && !isOrderPlaced) {
        push(`/user/cart`);
      }
    }
  }, [cartList, push, isOrderPlaced]);

  const totalPrice = selectedCarts.reduce(
    (pre, cur) => {
      return {
        actualPrice: Number.parseFloat(
          pre.actualPrice + cur.product.price * cur.itemCount,
        ).toFixed(2),
        discountPrice: Number.parseFloat(
          pre.discountPrice + cur.product.discount_price * cur.itemCount,
        ).toFixed(2),
      };
    },
    { actualPrice: 0, discountPrice: 0 },
  );

  async function handlePlaceOrder(data) {
    startTransition(async () => {
      try {
        console.log("testing");
        // const res = await placeOrder({
        //   customerInfo: data,
        //   items: selectedCarts,
        //   totalPrice,
        // });

        // if (res?.success) {
        //   toast.success("Order placed successfully");
        //   dispatch({
        //     type: DELETE_BULK_CART,
        //     payload: selectedCarts.map((item) => item.productId),
        //   });
        //   setIsOrderPlaced(true);
        //   localStorage.removeItem("selectedItems");
        //   push(res.invoice);
        // } else {
        //   throw Error(res?.message);
        // }
      } catch (error) {
        console.log(error, "here changed 1");
        toast.error("Failed to place order");
      }
    });
    // Handle order placement logic here (e.g., API call)
  }

  return (
    <form
      onSubmit={(e) => {
        clearErrors();
        handleSubmit(handlePlaceOrder)(e);
      }}
      className="space-y-4"
    >
      <div className="container grid grid-cols-12 items-start gap-6 pb-16 pt-4">
        <ContactForm
          userInfo={userInfo}
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <OrderSummary
          isSubmitting={isSubmitting}
          cartList={selectedCarts}
          totalPrice={totalPrice}
          register={register}
          errors={errors}
        />
      </div>
    </form>
  );
}
