"use client";
import { useAppContext } from "@/context";
import { testFun } from "@/lib/dbQueries/products";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ContactForm from "./ContactForm";
import OrderSummary from "./OrderSummary";

export default function CheckOutSummary({ userInfo }) {
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
    state: { cartList, isLoading },
    dispatch,
  } = useAppContext();
  const [selectedCarts, setSelectedCarts] = useState([]);

  useEffect(() => {
    const selectedProductIds = localStorage.getItem("selectedItems");
    if (selectedProductIds) {
      const selectedItems = JSON.parse(selectedProductIds);
      const items = cartList.filter((item) =>
        selectedItems.includes(item.productId),
      );
      setSelectedCarts(items);
    }
  }, [cartList, isOrderPlaced, isLoading, push]);

  useEffect(() => {
    // If selectedCarts is empty and loading is done, redirect to cart page

    if (
      !localStorage.getItem("selectedItems") &&
      !selectedCarts?.length &&
      !isLoading &&
      !isOrderPlaced
    ) {
      push("/user/cart");
    }
  }, [isLoading, push, isOrderPlaced, selectedCarts]);

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

  const handlePlaceOrder = startTransition(async () => {
    try {
      const res = await testFun();

      console.log(res);
      if (res?.success) {
        toast.success("Order placed successfully");
        dispatch({
          type: "DELETE_BULK_CART",
          payload: selectedCarts.map((item) => item.productId),
        });
        setIsOrderPlaced(true);
        localStorage.removeItem("selectedItems");
        push(`/user/invoice`);
      } else {
        throw new Error(res?.message);
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Failed to place order");
    }
  });

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
