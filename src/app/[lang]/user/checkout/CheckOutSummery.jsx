"use client";
import { useAppContext } from "@/context";
import { placeOrder } from "@/lib/dbQueries/placeOrder";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ContactForm from "./ContactForm";
import OrderSummary from "./OrderSummary";

export default function CheckOutSummary({ userInfo }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    setValue,
  } = useForm();
  const { push } = useRouter();
  const {
    state: { cartList, isLoading },
    dispatch,
  } = useAppContext();
  const [selectedCarts, setSelectedCarts] = useState([]);

  useEffect(() => {
    const selectedProductIds = localStorage.getItem("selectedItems");
    if (selectedProductIds && !isLoading) {
      const selectedItems = JSON.parse(selectedProductIds);
      const items = cartList.filter((item) =>
        selectedItems.includes(item.productId),
      );
      setSelectedCarts(items);
    }
  }, [cartList, isLoading]);

  useEffect(() => {
    // If selectedCarts is empty and loading is done, redirect to cart page
    const selectedProductIds = localStorage.getItem("selectedItems");

    if (!selectedCarts?.length && !isLoading && !selectedProductIds) {
      push("/user/cart");
    }
  }, [isLoading, push, selectedCarts]);

  const totalPrice = selectedCarts.reduce(
    (pre, cur) => {
      return {
        actualPrice: pre.actualPrice + cur.product.price * cur.itemCount,
        discountPrice:
          pre.discountPrice + cur.product.discount_price * cur.itemCount,
      };
    },
    { actualPrice: 0, discountPrice: 0 },
  );

  const handlePlaceOrder = async (data) => {
    try {
      const res = await placeOrder({
        customerInfo: data,
        items: selectedCarts,
        totalPrice,
      });
      console.log(res);
      if (res?.success) {
        toast.success("Order placed successfully");
        dispatch({
          type: "DELETE_BULK_CART",
          payload: selectedCarts.map((item) => item.productId),
        });
        push(`/user/invoice`);
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

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
          totalPrice={{
            actualPrice: totalPrice.actualPrice.toFixed(2),
            discountPrice: totalPrice.discountPrice.toFixed(2),
          }}
          register={register}
          errors={errors}
        />
      </div>
    </form>
  );
}
