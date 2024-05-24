import { getNewArrivalProducts } from "@/lib/dbQueries/products";
import ProducCard from "./ProducCard";

export default async function NewArrival() {
    const products = await getNewArrivalProducts()

    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">top new arrival</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {products?.map(product => <ProducCard key={product.id} {...product} />)}
            </div>
        </div>
    )
}
