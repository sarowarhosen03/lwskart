import Image from "next/image";
import Link from "next/link";
import RatingStart from "../ui/RatingStart";

export default function ProducCard({
    name,
    image,
    price,
    discount_price,
    ratings,
    reviewsNumber,
    sku,
}) {
    return (
        <div className=" group row-span-3 grid grid-rows-subgrid  overflow-hidden rounded bg-white shadow ">
            <div className="relative">
                <Image
                    priority
                    height={100}
                    width={100}
                    src={`/assets/images/products/${image[0]}`}
                    alt="product 1"
                    className="w-full"
                />
                <div
                    className="absolute inset-0 flex items-center justify-center gap-2 
                bg-black bg-opacity-40 opacity-0 transition group-hover:opacity-100"
                >
                    <Link
                        href={`/product/${name}-${sku}`}
                        draggable={false}
                        className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                        title="view product"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    <a
                        href="#"
                        className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                        title="add to wishlist"
                    >
                        <i className="fa-solid fa-heart"></i>
                    </a>
                </div>
            </div>
            <div className="px-4 pb-3 pt-4">
                <Link draggable={false} href={`/product/${name}-${sku}`}>
                    <h4 className="mb-2 text-xl font-medium uppercase text-gray-800 transition hover:text-primary">
                        {name}
                    </h4>
                </Link>
                <div className="mb-1 flex items-baseline space-x-2">
                    <p className="text-xl font-semibold text-primary">
                        ${discount_price}
                    </p>
                    <p className="text-sm text-gray-400 line-through">${price}</p>
                </div>
                <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                        <RatingStart count={ratings} />
                    </div>
                    <div className="ml-3 text-xs text-gray-500">({reviewsNumber})</div>
                </div>
            </div>
            <a
                href="#"
                className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary"
            >
                Add to cart
            </a>
        </div>
    );
}