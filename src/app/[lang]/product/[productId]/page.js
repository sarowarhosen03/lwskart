import Breadcrumb from "@/components/Breadcrumb";
import ProductScaffolding from "@/components/ui/loader/ProductScaffolding";
import prisma from "@/db/db";
import { getProductByNameAndSku } from "@/lib/dbQueries/products";
import { getDectionary } from "@/lib/getDictionary";
import { getSlug } from "@/utils/slugify";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({});
  return products.map((product) => ({
    productId: getSlug({ name: product.name, sku: product.sku }),
  }));
}

export async function generateMetadata({ params: { productId } }, parent) {
  const product = await getProductByNameAndSku(productId);
  if (!product) {
    return {
      title: `Product not found |  ${productId}`,
      description: "Product not found",
    };
  }
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.name + "| Lwskart",
    openGraph: {
      images: [
        `/assets/images/products/${product?.image?.[0]}`,
        ...previousImages,
      ],
    },
    description: product?.description,
  };
}

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
      <ProductDetails
        productInfo={productInfo}
        lang={lang}
        dict={dict}
        productdict={productdict}
      />
      )
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

export const revalidate = 0;
