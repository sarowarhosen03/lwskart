import { getProducts } from "@/lib/dbQueries/products";
import { getDectionary } from "@/lib/getDictionary";
import ProductCard from "../home/ProductCard";
import ProductPaginate from "./ProductPaginate";

export default async function ProductList({ dict, lang }) {
  const products = await getProducts();
  const productDict = await getDectionary(lang, "product");
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
        <ProductPaginate  productDict={productDict}/>
      </div>
    </div>
  );
}
