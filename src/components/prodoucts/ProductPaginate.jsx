"use client";

import useProducts from "@/hooks/useProducts";
import { useRef } from "react";
import ProducCard from "../home/ProducCard";
import Alert from "../ui/Alert";
import ProductItemScaffolding from "../ui/loader/ProductItemScaffolding";

export default function ProductPaginate() {
    const loaderRef = useRef()
    const { products, isLoading, error, hasMore } = useProducts({ loaderRef })
    return (
        <>
            {products.map((product) => (
                <ProducCard key={product.id} {...product} />
            ))}


            {
                isLoading && Array(6).fill(null).map((_i, index) => <ProductItemScaffolding key={index} />)
            }
            <div
                ref={loaderRef}
                id="loading "
                className=" col-span-1"
            ></div>
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
