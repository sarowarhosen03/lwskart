import ProductItem from "../prodoucts/ProductItem";

export default function ShopProductList() {
    return (
        <div className="col-span-3">


            <div className="grid md:grid-cols-3 grid-cols-2 gap-6">


                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />

            </div>
        </div>
    )
}
