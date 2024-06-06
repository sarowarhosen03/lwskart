import { getSlug } from "@/utils/slugify";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
const CartItem = ({
  item,
  selectedItems,
  quantities,
  handleSelection,
  handleQuantityChange,
  handleDeleteItem,
  deletingItems,
  cartDict,
}) => {
  return (
    <div
      className={clsx("mb-4 flex items-center justify-between border-b pb-4", {
        "bg-red-400 opacity-50 transition-opacity duration-500":
          deletingItems.includes(item.productId),
      })}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          id={`item-${item.productId}`}
          name="cartItem"
          value={item.productId}
          checked={selectedItems.includes(item.productId)}
          onChange={() =>
            handleSelection(item.productId, item.itemCount, item.status)
          }
          className="mr-4 "
        />
        <Image
          priority
          className="w-auto rounded-md object-cover"
          src={`/assets/images/products/${item.product.image[0]}`}
          alt={item.product.name}
          height={100}
          width={100}
        />
        <div className="ml-4">
          <Link
            href={`/product/${getSlug({ name: item.product.name, sku: item.product.sku })}`}
            className="text-lg font-semibold hover:text-primary"
          >
            {item.product.name}
          </Link>
          <p
            className={
              item.status === "outOfStock" ? "text-red-700" : "text-green-700"
            }
          >
            {item.status === "outOfStock" ? cartDict.out : "In Stock"}
          </p>
          <p className="text-lg font-semibold">
            Price
            <span className="pl-3 text-gray-600">
              $
              {(
                item.product.discount_price * (quantities[item.productId] || 1)
              ).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className="mt-2 flex items-center">
          <label htmlFor={`quantity-${item.productId}`} className="mr-2">
            Quantity:
          </label>
          <button
            onClick={() =>
              handleQuantityChange(
                item.productId,
                (quantities[item.productId] || 1) - 1,
                item.product.stock,
              )
            }
            className="rounded-l border bg-gray-200 px-2 py-1"
            disabled={item.itemCount === 0}
          >
            -
          </button>
          <input
            type="number"
            id={`quantity-${item.productId}`}
            value={quantities[item.productId] || 1}
            min="1"
            onChange={(e) =>
              handleQuantityChange(
                item.productId,
                parseInt(e.target.value),
                item.product.stock,
              )
            }
            className="w-16 border-b border-t p-1"
            disabled={item.itemCount === 0}
          />
          <button
            onClick={() =>
              handleQuantityChange(
                item.productId,
                (quantities[item.productId] || 1) + 1,
                item.product.stock,
              )
            }
            className="rounded-r border bg-gray-200 px-2 py-1"
            disabled={item.itemCount === 0}
          >
            +
          </button>
          <button
            onClick={() => handleDeleteItem(item.id, item.productId)}
            className="ml-4 text-red-600 hover:text-red-800"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
