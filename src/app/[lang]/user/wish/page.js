import { auth } from "@/auth/auth";
import WishToggleButton from "@/components/ui/WishToggleButton";
import prisma from "@/db/db";
import { getDectionary } from "@/lib/getDictionary";
import { getSlug } from "@/utils/slugify";
import Image from "next/image";
import Link from "next/link";

export default async function wishPage({ params: { lang } }) {
  const sessin = await auth();
  const wishList = await prisma.WishItem.findMany({
    where: {
      userId: sessin?.user.id,
    },
    include: {
      product: {
        select: {
          id: true,
          sku: true,
          name: true,
          image: true,
        },
      },
    },
  });
  const dictionary = await getDectionary(lang, "product");
  return (
    <div className="my-2 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
      {wishList.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-lg border shadow-md"
        >
          <Image
            height={64}
            width={100}
            src={`/assets/images/products/${item.product.image[0]}`}
            alt={item.product.name}
            className="h-64 w-full object-cover"
          />
          <div className="p-4">
            <Link
              href={`/product/${getSlug({ name: item.product.name, sku: item.product.sku })}`}
              className="mb-2 text-lg font-bold"
            >
              {item.product.name}
            </Link>
            <WishToggleButton
              productId={item.product.id}
              productdict={dictionary}
            />
          </div>
        </div>
      ))}
      {!wishList.length && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">No items in your wishlist</h2>
          <Link
            className="text-lg hover:bg-primary hover:text-white"
            href={`/shop`}
          >
            Shop now
          </Link>
        </div>
      )}
    </div>
  );
}

export const revalidate = 0;
