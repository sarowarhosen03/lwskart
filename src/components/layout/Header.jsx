import Image from "next/image";
import Link from "next/link";
import PrimaryNavopions from "./PrimaryNavopions";

export default function Header() {
    return (
        <header className="py-4 shadow-sm bg-white">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <Image priority src="/assets/images/logo.svg" alt="Logo" className="w-32" width={32} height={32} />
                </Link>

                <div className="w-full max-w-xl relative flex">
                    <span className="absolute left-4 top-3 text-lg text-gray-400">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input type="text" name="search" id="search"
                        className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                        placeholder="search" />
                    <button
                        className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex">Search</button>
                </div>

                <div className="flex items-center space-x-4">
                    <PrimaryNavopions />
                </div>
            </div>
        </header>
    )
}
