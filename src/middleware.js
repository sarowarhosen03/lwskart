import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { pathToRegexp } from "path-to-regexp";
import internationalization, {
  pathNameIsMissingLocale,
} from "./lib/controler/internationalization";

// Define public routes with dynamic segments
const publicOnlyRoutes = [
  pathToRegexp("/:lang/verify"),
  pathToRegexp("/:lang/login"),
  pathToRegexp("/:lang/register"),
];
const privateRoute = [
  pathToRegexp("/:lang/account"),
  pathToRegexp("/:lang/user/:rest*"),
  pathToRegexp("/api/user/:rest*"),
];

// Define matchRoute function
function matchRoute(pathname, routes) {
  for (let route of routes) {
    if (route.test(pathname)) {
      return true;
    }
  }
  return false;
}

export default function middleware(req) {
  if (!req.nextUrl.pathname?.startsWith("/api")) {
    // Add internationalization
    const pathNameIsMissing = pathNameIsMissingLocale(req);
    if (pathNameIsMissing) {
      return internationalization(req);
    }
  }
  return handleRouteMiddleware(req);
}

// Middleware function to handle routes
async function handleRouteMiddleware(req) {
  const pathname = req.nextUrl.pathname; // Extract pathname from the request
  const isPublicOnly = matchRoute(pathname, publicOnlyRoutes);
  if (isPublicOnly) {
    const options = { req, secret: process.env.AUTH_SECRET };
    if (process.env.NODE_ENV === "production" && req.url.startsWith("https")) {
      options.secureCookie = true;
    }
    const session = await getToken(options);
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  const isPrivateRoute = matchRoute(pathname, privateRoute);
  if (isPrivateRoute) {
    const options = { req, secret: process.env.AUTH_SECRET };
    if (process.env.NODE_ENV === "production" && req.url.startsWith("https")) {
      options.secureCookie = true;
    }
    const session = await getToken(options);
    if (!session && !pathname?.includes("login")) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("userId", session.user.id);
      return NextResponse.next({
        request: {
          // Apply new request headers
          headers: requestHeaders,
        },
      });
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|assets|.*\\..*|_next).*)"],
};
