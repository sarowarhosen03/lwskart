"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginButton() {
  const { status } = useSession();
  const pathname = usePathname();
  if (
    !(pathname.includes("/login") || pathname.includes("/register")) &&
    status !== "loading"
  ) {
    if (status === "authenticated") {
      return (
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-gray-200 transition hover:text-white"
        >
          Logout
        </button>
      );
    }
    return (
      <Link href="/login" className="text-gray-200 transition hover:text-white">
        Login
      </Link>
    );
  }

  return null;
}
