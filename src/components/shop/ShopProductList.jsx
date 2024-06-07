import getFiterdSearcResult from "@/lib/dbQueries/getFiterdSearcResult";
import { getDectionary } from "@/lib/getDictionary";
import ProductCard from "../home/ProductCard";
import ProductPaginate from "../product/ProductPaginate";
import Alert from "../ui/Alert";

export default async function ShopProductList({ searchParams, lang }) {
  const {
    category = "",
    price = [],
    search = "",
    page = 1,
    limit = 15,
    size=""
  } = searchParams;

  const { products, ...paginate } = await getFiterdSearcResult({
    category: decodeURIComponent(category).split("|"),
    price: decodeURIComponent(price).split("|"),
    search: decodeURIComponent(search),
    page: parseInt(page),
    limit: parseInt(limit),
    size
  });
  const productDict = await getDectionary(lang, "product");
  const { limit: limitDict } = await getDectionary(lang, "shop");

  return (
    <div className="col-span-3  max-h-dvh overflow-scroll">
      <div className="grid grid-cols-2  gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            productDict={productDict}
          />
        ))}
        {!products.length && (
          <div className="col-span-2 md:col-span-3">
            {" "}
            <Alert variant="info" message="No Related Product Found Here" />
          </div>
        )}
      </div>
      <ProductPaginate paginate={paginate} limitDict={limitDict} />
    </div>
  );
}
