import Breadcrumb from "@/components/Breadcrumb";
import ProductScaffolding from "@/components/ui/loader/ProductScaffolding";
import { getProductByNameAndSku } from "@/lib/dbQueries/products";
import { getDectionary } from "@/lib/getDictionary";
import { parsSlug } from "@/utils/slugify";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";

export default async function prodctDetailsPage({
  params: { productId, lang },
}) {
  const productInfo = await getProductByNameAndSku(productId);
  if (!productInfo) {
    notFound();
  }
  const dict = await getDectionary(lang, "productDetails");
  const productdict = await getDectionary(lang, "product");
  return (
    <>
      <Breadcrumb />
      {productInfo ? (
        <ProductDetails
          productInfo={productInfo}
          lang={lang}
          dict={dict}
          productdict={productdict}
        />
      ) : (
        <div className="container h-dvh w-dvw">
          <h1>No Product found {[parsSlug(productId)]}</h1>
        </div>
      )}
      <div className="container pb-16">
        <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
          {dict.relatedProducts}
        </h2>
        <div className="grid grid-cols-4 gap-6">
          <Suspense fallback={<ProductScaffolding count={10} />}>
            <RelatedProducts
              payload={{
                categoryId: productInfo?.categoryId,
                productId: productInfo?.id,
                tags: productInfo?.tags,
                price: productInfo?.price,
              }}
              lang={lang}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
export const revalidateTag = ["products"];
