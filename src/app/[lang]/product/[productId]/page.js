import Breadcrumb from "@/components/Breadcrumb";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";

export default function prodctDetailsPage({ params: { productId } }) {

    return (
        <>
            <Breadcrumb />
            <ProductDetails productId={productId} />
            <RelatedProducts />

        </>
    )
}
