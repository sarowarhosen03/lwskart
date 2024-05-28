'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function WishToggle({ wishItem }) {
    const user = useSession();
    return (
        <Link
            href="#"
            className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
            title="add to wishlist"
        >
            <i className="fa-solid fa-heart"></i>
        </Link>
    )
}
