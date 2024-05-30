import ProducCard from "@/components/home/ProducCard";
import Alert from "@/components/ui/Alert";
import { getRelatedProducts } from "@/lib/dbQueries/products";
import Link from "next/link";

export default async function RelatedProducts({ payload }) {
    const { products, total } = await getRelatedProducts(payload);
    return (
        <>
            {products.map((product) => (
                <ProducCard key={product.id} {...product} />
            ))}
            {!products.length && (
                <Alert variant="info" message="No Related Product Found Here" />
            )}
            {total > 0 && (
                <div className="col-span-2  text-center md:col-span-4">
                    <Link
                        href={`/shop/`}
                        className="rounded-md bg-primary px-2 py-1 text-white"
                    >
                        {" "}
                        View All
                    </Link>
                </div>
            )}
        </>
    );
}
