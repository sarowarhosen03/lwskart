import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { pathToRegexp } from "path-to-regexp";
import internationalization, {
  pathNameIsMissingLocale,
} from "./lib/controler/internationalization";

export default function middleware(req) {
  if (!req.nextUrl.pathname?.startsWith("/api")) {
    //add internationalization
    const pathNameIsMissing = pathNameIsMissingLocale(req);
    if (pathNameIsMissing) {
      return internationalization(req);
    }
    //handle public and private routes
    return handleRouteMiddleware(req);
  }
  return handleRouteMiddleware(req);
}

// Define matchRoute function
function matchRoute(pathname, routes) {
  for (let route of routes) {
    if (route.test(pathname)) {
      return true;
    }
  }
  return false;
}

// Function to match the pathname against the routes

// Define public routes with dynamic segments
const publicOnlyRoutes = [
  pathToRegexp("/:locals/verify"),
  pathToRegexp("/:locals/login"),
  pathToRegexp("/:locals/register"),
];
const privateRoute = [
  pathToRegexp("/:locals/account"),
  pathToRegexp("/:locals/user/:rest*"),
  pathToRegexp("/api/user/:rest*"),
];

// Middleware function to handle routes
async function handleRouteMiddleware(req) {
  const pathname = req.nextUrl.pathname; // Extract pathname from the request
  const isPublicOnly = matchRoute(pathname, publicOnlyRoutes);
  if (isPublicOnly) {
    const options = { req, secret: process.env.AUTH_SECRET };
    if (process.env.NODE_ENV === "production") {
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
    if (session) {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("userId", session.user.id);
      return NextResponse.next({
        request: {
          // Apply new request headers
          headers: requestHeaders,
        },
      });
    } else {
      // return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|assets|.*\\..*|_next).*)"],
};
