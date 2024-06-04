"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  let pathName = usePathname();
  pathName = pathName.split("/").pop();

  return (
    <div className="container flex items-center gap-3 py-4">
      <Link href="/" className="text-base text-primary">
        <i className="fa-solid fa-house"></i>
      </Link>
      <span className="text-sm text-gray-400">
        <i className="fa-solid fa-chevron-right"></i>
      </span>

      <p className="font-medium text-gray-600 ">{pathName}</p>
    </div>
  );
}
