import { getNewArrivalProducts } from "@/lib/dbQueries/products";
import { getDectionary } from "@/lib/getDictionary";
import ProducCard from "./ProductCard";

export default async function NewArrival({ dict,lang }) {
  const products = await getNewArrivalProducts();
  const productDict = await getDectionary(lang, "product");

  return (
    <div className="container pb-16">
      <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
        {dict.newArrival}
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {products?.map((product) => (
          <ProducCard key={product.id} {...product} productDict={productDict} />
        ))}
      </div>
    </div>
  );
}
