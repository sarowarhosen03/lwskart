"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ children, href }) {
  const path = usePathname();
  const pathName = path.split("/").slice(2).join("/");

  return (
    <Link
      href={href}
      className={`p-2 text-gray-200 transition hover:text-white ${href.replace("/", "") === pathName ? "bg-primary  text-white" : ""}`}
    >
      {children}
    </Link>
  );
}
