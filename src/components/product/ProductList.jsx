import { getProducts } from "@/lib/dbQueries/products";
import ProducCard from "../home/ProducCard";
import ProductPaginate from "./ProductPaginate";

export default async function ProductList() {
    const products = await getProducts()

    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">TRENDING PRODUCTS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6  ">


                {products?.map(product => <ProducCard key={product.id} {...product} />)

                }
                <ProductPaginate />
            </div>
        </div>
    )
}
