import { getTrendingProducts } from "@/lib/dbQueries/getProdcuts";
import { getDectionary } from "@/lib/getDictionary";
import Link from "next/link";
import ProductCard from "../home/ProductCard";

export default async function ProductList({ dict, lang }) {
  const products = await getTrendingProducts();
  const productDict = await getDectionary(lang, "product");
  const { visitShop } = await getDectionary(lang, "home");

  return (
    <div className="container pb-16">
      <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
        {dict}
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4  ">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            productDict={productDict}
          />
        ))}

        <div className="col-span-2 flex flex-col space-y-4 text-center md:col-span-4">
          <Link
            href="/shop"
            className=" mx-auto w-fit bg-primary px-5 py-3  font-bold text-white "
          >
            {visitShop}
          </Link>
        </div>
      </div>
    </div>
  );
}
