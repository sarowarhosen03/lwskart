'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function LoginButton() {
    const { status } = useSession();
    const pathname = usePathname();
    if (!pathname.includes("/login") && status !== 'loading') {
        if (status === 'authenticated') {
            return <button onClick={() => signOut({ callbackUrl: '/logi' })} className="text-gray-200 hover:text-white transition">Logout</button>
        }
        return <Link href="/login" className="text-gray-200 hover:text-white transition">Login</Link>

    }


    return null;
}
