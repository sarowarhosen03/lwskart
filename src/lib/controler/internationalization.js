import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { NextResponse } from "next/server";

let defaultLocale = "en";
export let locales = [
  {
    code: "en",
    language: "English",
    image: "/assets/images/icons/usa.png",
  },
  {
    code: "bn",
    language: "Bangla",
    image: "/assets/images/icons/bd.png",
  },
];

function getLocale(request) {
  const preferredLanguage = request.cookies.get("lang")?.value;
  if (preferredLanguage) {
    return preferredLanguage;
  }
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers })?.languages();

  return match(
    languages,
    locales.map((loc) => loc.code),
    defaultLocale,
  ); // en or bn
}
export function pathNameIsMissingLocale(request) {
  // get the pathname from request url
  const pathname = request.nextUrl.pathname;

  const pathNameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale.code}`) &&
      !pathname.startsWith(`/${locale.code}/`),
  );
  return pathNameIsMissingLocale;
}

export default function internationalization(request) {
  // detect user's preference & redirect with a locale with a path eg: /en/about
  const locale = getLocale(request);
  // Create a URL object
  const url = new URL(request.url);
  const pathname = url.pathname;
  const search = url.search;
  const newPathname = `/${locale}${pathname}`;
  // Construct the new URL
  const newUrl = `${newPathname}${search}`;
  return NextResponse.redirect(new URL(newUrl, request.url));
}
