"use client";

import useProducts from "@/hooks/useProducts";
import { useRef } from "react";
import ProducCard from "../home/ProductCard";
import Alert from "../ui/Alert";
import ProductScaffolding from "../ui/loader/ProductScaffolding";

export default function ProductPaginate({ productDict }) {
  const loaderRef = useRef();

  const { products, isLoading, error, hasMore } = useProducts({ loaderRef });
  return (
    <>
      {products.map((product) => (
        <ProducCard key={product.id} {...product} productDict={productDict} />
      ))}

      {isLoading && <ProductScaffolding />}
      <div ref={loaderRef} id="loading " className=" col-span-1"></div>
      {!hasMore && (
        <div className="col-span-2 md:col-span-4">
          <Alert variant="info" message="no more product Found" />
        </div>
      )}
      {error && (
        <div className="col-span-2 md:col-span-4">
          <Alert variant="danger" message={error} />
        </div>
      )}
    </>
  );
}
