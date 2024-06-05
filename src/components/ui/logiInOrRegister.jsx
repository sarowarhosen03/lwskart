"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginOrRegister({ dict }) {
  const { status } = useSession();
  return status === "unauthenticated" ? (
    <Link href="/login" className="text-gray-200 transition hover:text-white">
      {dict.login}
    </Link>
  ) : (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-gray-200 transition hover:text-white"
    >
      {dict.logout}
    </button>
  );
}
