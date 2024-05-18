import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

let defaultLocale = 'en';
export let locales = [{
    'code': 'en', 'language': 'English', "image": '/assets/icons/usa.png'
}, {
    'code': 'bn', 'language': 'Bangla', "image": '/assets/icons/bd.png'
}];

function getLocale(request) {

    const preferedLanguage = request.cookies.get("lang")?.value;
    if(preferedLanguage){
        return preferedLanguage;
    }
    const acceptedLanguage =
        request.headers.get("accept-language") ?? undefined;
    const headers = { "accept-language":acceptedLanguage };
    const languages = new Negotiator({ headers })?.languages();

    return match(languages, locales.map(loc=>loc.code), defaultLocale); // en or bn
}

export function middleware(request) {
    // get the pathname from request url
    const pathname = request.nextUrl.pathname;

    const pathNameIsMissingLocale = locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale.code}`) &&
            !pathname.startsWith(`/${locale.code}/`)
    );

    if (pathNameIsMissingLocale) {
        // detect user's preference & redirect with a locale with a path eg: /en/about
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, assets, api)
        '/((?!api|assets|.*\\..*|_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}

