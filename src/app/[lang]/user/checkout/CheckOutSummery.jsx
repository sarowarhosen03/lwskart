"use client";
import { useAppContext } from "@/context";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ContactForm from "./ContactForm";
import OrderSummary from "./OrderSummary";

export default function CheckOutSummary({ userInfo, dictionary }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    setValue,
    lang,
  } = useForm();

  const { push } = useRouter();
  const {
    state: { cartList, isLoading },
    dispatch,
  } = useAppContext();

  const productSkuList = useSearchParams().get("productId")?.split("|");
  let selectedCarts = cartList.filter((item) =>
    productSkuList?.includes(item.productId),
  );

  useEffect(() => {
    if (!isLoading && selectedCarts.length === 0) {
    push("/user/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const res = await fetch("/api/user/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo: data,
          items: selectedCarts,
          totalPrice,
        }),
      });

      const responseData = await res.json();
      if (responseData?.success) {
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
          lang={lang}
          dictionary={dictionary}
        />
        <OrderSummary
          isSubmitting={isSubmitting}
          cartList={selectedCarts}
          errors={errors}
          totalPrice={{
            actualPrice: totalPrice.actualPrice.toFixed(2),
            discountPrice: totalPrice.discountPrice.toFixed(2),
          }}
          register={register}
          lang={lang}
          dictionary={dictionary}
        />
      </div>
    </form>
  );
}
