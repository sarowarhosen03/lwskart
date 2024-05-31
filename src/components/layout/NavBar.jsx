import LoginButton from "@/components/ui/LoginButton";
import getCategories from "@/lib/dbQueries/categoryQuery";
import Image from "next/image";
import Link from "next/link";
export default async function NavBar() {
    const categories = await getCategories({ page: 1, limit: 10 });
    return (
        <nav className="bg-gray-800">
            <div className="container flex">
                <div className="group relative hidden cursor-pointer items-center bg-primary px-8 py-4 md:flex">
                    <span className="text-white">
                        <i className="fa-solid fa-bars"></i>
                    </span>
                    <span className="ml-2 hidden capitalize text-white">
                        All Categories
                    </span>

                    {/* <!-- dropdown --> */}
                    <div
                        className="invisible absolute left-0 top-full w-[600px] divide-y divide-dashed divide-gray-300 bg-white py-3 opacity-0 shadow-md transition duration-300 group-hover:visible group-hover:opacity-100"
                        style={{
                            width: "300px",
                        }}
                    >
                        {categories?.map((category) => (
                            <Link
                                key={category.id}
                                scroll={false}
                                href={`/shop/?category=${category}`}
                                className="flex items-center px-6 py-3 transition hover:bg-gray-100"
                            >
                                <Image
                                    src={`/assets/images/category/${category.thumbnail}`}
                                    alt={category.name}
                                    className="h-5 w-5 object-contain"
                                    height={5}
                                    width={5}
                                />
                                <span className="ml-6 text-sm text-gray-600">
                                    {category.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-grow items-center justify-between py-5 md:pl-12">
                    <div className="flex items-center space-x-6 capitalize">
                        <Link
                            href="index.html"
                            className="text-gray-200 transition hover:text-white"
                        >
                            Home
                        </Link>
                        <Link
                            href="pages/shop.html"
                            className="text-gray-200 transition hover:text-white"
                        >
                            Shop
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-200 transition hover:text-white"
                        >
                            About us
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-200 transition hover:text-white"
                        >
                            Contact us
                        </Link>
                    </div>
                    <LoginButton />
                </div>
            </div>
        </nav>
    );
}
