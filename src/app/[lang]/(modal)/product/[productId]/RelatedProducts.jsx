import ProductCard from "@/components/home/ProductCard";
import Alert from "@/components/ui/Alert";
import { getRelatedProducts } from "@/lib/dbQueries/products";
import { getDectionary } from "@/lib/getDictionary";
import Link from "next/link";

export default async function RelatedProducts({ payload, lang }) {
  const { products, total } = await getRelatedProducts(payload);
  const dict = await getDectionary(lang, "product");

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} productDict={dict} />
      ))}
      {!products.length && (
        <Alert variant="info" message="No Related Product Found Here" />
      )}
      {total > 0 && (
        <div className="col-span-2  text-center md:col-span-4">
          <Link
            href={`/shop/`}
            className="rounded-md bg-primary px-2 py-1 text-white"
          >
            {" "}
            View All
          </Link>
        </div>
      )}
    </>
  );
}
