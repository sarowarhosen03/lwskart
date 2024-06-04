import getFiterdSearcResult from "@/lib/dbQueries/getFiterdSearcResult";
import ProductCard from "../home/ProductCard";
import Alert from "../ui/Alert";

export default async function ShopProductList({ searchParams }) {
  const { category = "", price = [], search = "" } = searchParams;
  const products = await getFiterdSearcResult({
    category: decodeURIComponent(category).split("|"),
    price: decodeURIComponent(price).split("|"),
    search: decodeURIComponent(search),
  });
  return (
    <div className="col-span-3">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
        {!products.length && (
          <Alert variant="info" message="No Related Product Found Here" />
        )}
      </div>
    </div>
  );
}
