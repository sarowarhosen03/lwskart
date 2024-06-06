"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginOrRegister({ dict }) {
  const { status } = useSession();
  const pathName = usePathname();

  if (pathName.includes("/login") || pathName.includes("/register")) {
    return null;
  }
  return status === "unauthenticated" ? (
    <Link
      href="/login"
      className=" px-3 py-2 text-white transition  hover:bg-primary hover:text-white"
    >
      {dict.login}
    </Link>
  ) : (
    <div className=" flex gap-4">
      <Link
        href={`/user/invoice`}
        className="px-3 py-1 text-gray-200 transition  hover:bg-primary hover:text-white"
      >
        {dict.orders}
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="px-3 py-1 text-gray-200 transition hover:bg-primary  hover:text-white"
      >
        {dict.logout}
      </button>
    </div>
  );
}
