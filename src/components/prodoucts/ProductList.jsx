import ProductItem from "./ProductItem";

export default function ProductList() {
    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">TRENDING PRODUCTS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />

            </div>
        </div>
    )
}
