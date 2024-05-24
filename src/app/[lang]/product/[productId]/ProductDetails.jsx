import ImageGalary from "@/app/[lang]/product/[productId]/ImageGalary";
import RatingStart from "@/components/ui/RatingStart";
import { getProductByNameAndSku } from "@/lib/dbQueries/products";
export default async function ProductDetails({ productId }) {
    const productInfo = await getProductByNameAndSku(productId);
    const { image, name, ratings, reviewsNumber } = productInfo;

    return (
        <>
            <div className="container grid grid-cols-2 gap-6">
                <ImageGalary image={image} />

                <div>
                    <h2 className="mb-2 text-3xl font-medium uppercase">{name}</h2>
                    <div className="mb-4 flex items-center">
                        <div className="flex gap-1 text-sm text-yellow-400">
                            <RatingStart count={ratings} />
                        </div>
                        <div className="ml-3 text-xs text-gray-500">({reviewsNumber} Reviews)</div>
                    </div>
                    <div className="space-y-2">
                        <p className="space-x-2 font-semibold text-gray-800">
                            <span>Availability: </span>
                            <span className="text-green-600">In Stock</span>
                        </p>
                        <p className="space-x-2">
                            <span className="font-semibold text-gray-800">Brand: </span>
                            <span className="text-gray-600">Apex</span>
                        </p>
                        <p className="space-x-2">
                            <span className="font-semibold text-gray-800">Category: </span>
                            <span className="text-gray-600">Sofa</span>
                        </p>
                        <p className="space-x-2">
                            <span className="font-semibold text-gray-800">SKU: </span>
                            <span className="text-gray-600">BE45VGRT</span>
                        </p>
                    </div>
                    <div className="mb-1 mt-4 flex items-baseline space-x-2 font-roboto">
                        <p className="text-xl font-semibold text-primary">$45.00</p>
                        <p className="text-base text-gray-400 line-through">$55.00</p>
                    </div>

                    <p className="mt-4 text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius
                        eum reprehenderit dolore vel mollitia optio consequatur hic
                        asperiores inventore suscipit, velit consequuntur, voluptate
                        doloremque iure necessitatibus adipisci magnam porro.
                    </p>

                    <div className="mt-4">
                        <h3 className="mb-1 text-sm uppercase text-gray-800">Quantity</h3>
                        <div className="flex w-max divide-x divide-gray-300 border border-gray-300 text-gray-600">
                            <div className="flex h-8 w-8 cursor-pointer select-none items-center justify-center text-xl">
                                -
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center text-base">
                                4
                            </div>
                            <div className="flex h-8 w-8 cursor-pointer select-none items-center justify-center text-xl">
                                +
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                        <a
                            href="#"
                            className="flex items-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
                        >
                            <i className="fa-solid fa-bag-shopping"></i> Add to cart
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-2 rounded border border-gray-300 px-8 py-2 font-medium uppercase text-gray-600 transition hover:text-primary"
                        >
                            <i className="fa-solid fa-heart"></i> Wishlist
                        </a>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <a
                            href="#"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500"
                        >
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a
                            href="#"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500"
                        >
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a
                            href="#"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500"
                        >
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="container pb-16">
                <h3 className="border-b border-gray-200 pb-3 font-roboto font-medium text-gray-800">
                    Product details
                </h3>
                <div className="w-3/5 pt-6">
                    <div className="text-gray-600">
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                            necessitatibus deleniti natus dolore cum maiores suscipit optio
                            itaque voluptatibus veritatis tempora iste facilis non aut
                            sapiente dolor quisquam, ex ab.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
                            quae accusantium voluptatem blanditiis sapiente voluptatum. Autem
                            ab, dolorum assumenda earum veniam eius illo fugiat possimus illum
                            dolor totam, ducimus excepturi.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                            quia modi ut expedita! Iure molestiae labore cumque nobis quasi
                            fuga, quibusdam rem? Temporibus consectetur corrupti rerum
                            veritatis numquam labore amet.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
