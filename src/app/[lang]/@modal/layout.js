"use client";

import { matchRoute } from "@/middleware";
import { usePathname } from "next/navigation";
import { pathToRegexp } from "path-to-regexp";
//having a problem with intercepting route modal handlign so  did a little hack 
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
