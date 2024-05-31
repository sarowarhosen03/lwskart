import Breadcrumb from "@/components/Breadcrumb";
import ProductScaffolding from "@/components/ui/loader/ProductScaffolding";
import { getProductByNameAndSku } from "@/lib/dbQueries/products";
import { Suspense } from "react";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";

export default async function prodctDetailsPage({
  params: { productId, lang },
}) {
  const productInfo = await getProductByNameAndSku(productId);
  return (
    <>
      <Breadcrumb />
      <ProductDetails productInfo={productInfo} lang={lang} />

      <div className="container pb-16">
        <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
          Related products
        </h2>
        <div className="grid grid-cols-4 gap-6">
          <Suspense fallback={<ProductScaffolding count={10} />}>
            <RelatedProducts
              payload={{
                categoryId: productInfo.categoryId,
                productId: productInfo.id,
                tags: productInfo.tags,
                price: productInfo.price,
              }}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
