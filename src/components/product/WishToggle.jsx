"use client";
import useWish from "@/hooks/useWish";

export default function WishToggle({ productId, productDict }) {
  const [handleToggleWish, wishListed] = useWish(productId);
  return (
    <button
      onClick={handleToggleWish}
      className={`flex h-8 w-9 items-center justify-center rounded-full transition ${wishListed ? "bg-primary text-white" : "bg-white text-primary"} text-lg`}
      title={
        wishListed
          ? productDict.wishlistTitleRemove
          : productDict.wishlistTitleAdd
      }
    >
      <i
        className={`fa-solid fa-heart ${wishListed ? "text-white" : "text-primary"}`}
      ></i>
    </button>
  );
}
