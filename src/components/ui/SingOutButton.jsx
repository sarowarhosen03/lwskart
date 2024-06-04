"use client";
import { signOut } from "next-auth/react";

export default function SingOutButton({ children }) {
  return (
    <>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="text-gray-200 transition hover:text-white"
      >
        {children || "Sign Out"}
      </button>
    </>
  );
}
