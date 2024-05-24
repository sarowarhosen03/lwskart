import { getProducts } from "@/lib/dbQueries/products";
import { useEffect, useRef, useState } from "react";

export default function useProducts({ loaderRef, limit = 10 }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('')
    const [hasMore, setHasmore] = useState(true);

    const page = useRef(1);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchNextPage = async () => {
            setIsLoading(prev => true);
            setError("")
            try {
                const productList = await getProducts({
                    page: page.current,
                    limit,
                });

                if (!productList.length) {
                    setHasmore(false);
                } else {
                    page.current += 1;
                    setProducts(products.concat(productList));
                }
            } catch (error) {
                setError("something went wrong while fetching products")
            }
            setIsLoading(prev => false);


        };
        const onIntersection = (items) => {
            const loaderItem = items[0];

            if (loaderItem.isIntersecting && hasMore) {
                fetchNextPage();
            }
        };

        const observer = new IntersectionObserver(onIntersection);

        if (observer && loaderRef?.current) {
            observer.observe(loaderRef.current);
        }

        // cleanup
        return () => {
            if (observer) observer.disconnect();
        };
    }, [loaderRef, products, hasMore, limit]);
    return { error, isLoading, products, hasMore };
}
