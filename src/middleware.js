import {
    nextMiddleware,
    setMiddleware,
} from "../src/lib/midilwareHelper";
import internationalization from "./lib/controler/internationalization";

setMiddleware('/*', internationalization)
// setMiddleware('/login', async (req) => {
//     const season = await auth();
//     if (season?.user) {
//         redirect("/")
//     }

// })



export function middleware(request) {
    return nextMiddleware(request);

}

export const config = {
    matcher: [
        // Skip all internal paths (_next, assets, api)
        '/((?!api|assets|.*\\..*|_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}

