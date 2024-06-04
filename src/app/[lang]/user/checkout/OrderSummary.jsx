import { useAppContext } from "@/context";
import { getSlug } from "@/utils/slugify";
import Link from "next/link";

export default function OrderSummary({
  cartList,
  totalPrice,
  register,
  errors,
  isSubmitting,
}) {
  const {
    state: { isLoading },
  } = useAppContext();
  if (isLoading) {
    return (
      <div className="col-span-4 rounded border border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          <div className="mt-2 space-y-2">
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-4 rounded border border-gray-200 p-4">
      <h4 className="mb-4 text-lg font-medium uppercase text-gray-800">
        Order Summary
      </h4>
      <div className="space-y-2">
        {cartList.map((cart) => (
          <div key={cart.id} className="flex justify-between">
            <div>
              <Link
                href={
                  "/product/" +
                  getSlug({ name: cart.product.name, sku: cart.product.sku })
                }
                className="font-medium text-gray-800"
              >
                {cart.product.name}
              </Link>
              <p className="text-sm text-gray-600">
                Price: ${Number.parseFloat(cart.product.price).toFixed(2)}
              </p>
            </div>
            <p className="text-gray-600">{cart.itemCount}x</p>
            <p className="font-medium text-gray-800">
              $
              {Number.parseFloat(cart.product.price * cart.itemCount).toFixed(
                2,
              )}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between border-b border-gray-200 py-3 font-medium uppercase text-gray-800">
        <p>Subtotal</p>
        <p>${totalPrice.actualPrice}</p>
      </div>
      <div className="mt-1 flex justify-between border-b border-gray-200 py-3 font-medium uppercase text-gray-800">
        <p>Shipping</p>
        <p>Free</p>
      </div>
      <div className="mt-1 flex justify-between border-b border-gray-200 py-3 font-medium uppercase text-gray-800">
        <p>Discounted</p>
        <del className="font-bold">
          $
          {Number.parseFloat(
            totalPrice.actualPrice - totalPrice.discountPrice,
          ).toFixed(2)}
        </del>
      </div>
      <div className="flex justify-between py-3 font-medium uppercase text-gray-800">
        <p className="font-semibold">Total</p>
        <p>${totalPrice.discountPrice}</p>
      </div>
      <div className="mb-4 mt-2 flex items-center">
        <input
          type="checkbox"
          name="agreement"
          {...register("agreement", {
            required: "You must agree to the terms and conditions",
          })}
          className="h-3 w-3 cursor-pointer rounded-sm text-primary focus:ring-0"
        />
        <label
          htmlFor="agreement"
          className="ml-3 cursor-pointer text-sm text-gray-600"
        >
          I agree to the{" "}
          <a href="#" className="text-primary">
            terms & conditions
          </a>
        </label>
      </div>
      {errors.agreement && (
        <p className="mt-2 text-sm text-pink-600">{errors.agreement.message}</p>
      )}

      <button
        disabled={isSubmitting || errors?.agreement || cartList.length === 0}
        type="submit"
        className="block w-full rounded-md border border-primary bg-primary px-4 py-3 text-center font-medium text-white transition hover:bg-transparent hover:text-primary disabled:bg-red-400"
      >
        Place Order
      </button>
    </div>
  );
}
