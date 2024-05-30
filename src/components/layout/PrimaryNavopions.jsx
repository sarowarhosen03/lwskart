"use client";
import { useAppContext } from "@/context";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PrimaryNavopions() {
    const { status } = useSession();
    const isAuthorized = status === "authenticated";
    const visibility = isAuthorized ? "visible" : "invisible";
    const { state: { wishCount, cartCount } } = useAppContext();
    const { lang } = useParams();

    return (
        <>
            <Link
                href={`${lang}/user/wishlist`}
                className={`relative text-center text-gray-700 transition hover:text-primary ${visibility} `}
            >
                <div className="text-2xl">
                    <i className="fa-regular fa-heart"></i>
                </div>
                <div className="text-xs leading-3">Wishlist</div>
                <div className="absolute -top-1 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {wishCount}
                </div>
            </Link>
            <Link
                href={`${lang}/user/cart`}
                className={`relative text-center text-gray-700 transition hover:text-primary ${visibility} `}
            >
                <div className="text-2xl">
                    <i className="fa-solid fa-bag-shopping"></i>
                </div>
                <div className="text-xs leading-3">Cart</div>
                <div className="absolute -right-3 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {cartCount}
                </div>
            </Link>
            <Link
                className={`relative text-center text-gray-700 transition hover:text-primary  ${visibility}`}
                href="#"
            >
                <div className="text-2xl">
                    <i className="fa-regular fa-user"></i>
                </div>
                <div className="text-xs leading-3">Account</div>
            </Link>
        </>
    );
}
