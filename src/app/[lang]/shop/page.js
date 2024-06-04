import Breadcrumb from "@/components/Breadcrumb";
import ShopProductList from "@/components/shop/ShopProductList";
import ProductScaffolding from "@/components/ui/loader/ProductScaffolding";
import { Suspense } from "react";
import SideBar from "./SideBar";

export default async function shopPage({ searchParams }) {
  return (
    <>
      <Breadcrumb />
      <div className="container grid grid-cols-2 items-start gap-6 pb-16 pt-4 md:grid-cols-4">
        <Suspense>
          <SideBar />
        </Suspense>
        <Suspense fallback={<ProductScaffolding count={10} />}>
          <ShopProductList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
