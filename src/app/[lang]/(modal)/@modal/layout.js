"use client";

import { matchRoute } from "@/middleware";
import { usePathname } from "next/navigation";
import { pathToRegexp } from "path-to-regexp";
//bavugatubg from intercpetd rotue not closing the modal so i did this kuttke gacj
const inteceptdRoute = [
  pathToRegexp("/:lang/user/cart"),
  pathToRegexp("/:lang/user/wish"),
  pathToRegexp("/:lang/login"),
  pathToRegexp("/:lang/user/invoice/view"),
];
export default function Layout({ children }) {
  const pathname = usePathname();

  const isMatch = matchRoute(pathname, inteceptdRoute);
  return isMatch ? children : null;
}
