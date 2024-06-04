import getFiterdSearcResult from "@/lib/dbQueries/getFiterdSearcResult";
import { getDectionary } from "@/lib/getDictionary";
import ProductCard from "../home/ProductCard";
import Alert from "../ui/Alert";

export default async function ShopProductList({ searchParams, lang }) {
  const { category = "", price = [], search = "" } = searchParams;
  const products = await getFiterdSearcResult({
    category: decodeURIComponent(category).split("|"),
    price: decodeURIComponent(price).split("|"),
    search: decodeURIComponent(search),
  });
  const productDict = await getDectionary(lang, "product");
  return (
    <div className="col-span-3">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            productDict={productDict}
          />
        ))}
        {!products.length && (
          <Alert variant="info" message="No Related Product Found Here" />
        )}
      </div>
    </div>
  );
}
