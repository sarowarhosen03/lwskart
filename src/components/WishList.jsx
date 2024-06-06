import AddToCartBtn from "@/components/ui/AddToCartBtn";
import WishToggleButton from "@/components/ui/WishToggleButton";
import { getSlug } from "@/utils/slugify";
import Image from "next/image";
import Link from "next/link";

export default async function WishList({ wishList, dictionary, empty }) {
  return (
    <div className="mx-auto flex w-fit flex-wrap items-center  justify-between p-9  py-12 text-center">
      {wishList.map((item) => (
        <div key={item.id} className="flex  rounded-lg border shadow-md">
          <Image
            height={64}
            width={100}
            src={`/assets/images/products/${item.product.image[0]}`}
            alt={item.product.name}
            className="h-auto w-[200px] object-cover"
          />
          <div className="p-4">
            <Link
              href={`/product/${getSlug({ name: item.product.name, sku: item.product.sku })}`}
              className="mb-2 text-lg font-bold"
            >
              {item.product.name}
            </Link>
            <div className="flex flex-col gap-1">
              {" "}
              <WishToggleButton
                productId={item.product.id}
                productdict={dictionary}
              />
              <AddToCartBtn
                {...{
                  productId: item.product.id,
                  availability: item.product.availability,
                  stock: item.product.stock,
                  isLoading: false,
                }}
                productDict={dictionary}
              />
            </div>
          </div>
        </div>
      ))}
      {!wishList.length && (
        <div className=" mx-auto flex flex-col  items-center  gap-4 text-center">
          <h2 className="text-2xl font-bold">{empty}</h2>
          <Link
            className="w-fit rounded-md bg-primary p-3 text-lg text-white"
            href={`/shop`}
          >
            visit Shop now
          </Link>
        </div>
      )}
    </div>
  );
}
