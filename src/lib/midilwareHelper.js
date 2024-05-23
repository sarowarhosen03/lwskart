const routes = {};

function setMiddleware(path, callback) {
    routes[path] = callback;
}

function nextMiddleware(req) {
    const path = req.nextUrl.pathname;
    // Check if the path matches any defined route
    for (let route in routes) {
        const pattern = new RegExp("^" + route.replace(/:[^\s/]+/g, '([\\w-]+)').replace(/\*/g, '.*') + "$");
        if (pattern.test(path)) {
            // If there's a match, execute the corresponding callback function
            return routes[route](req);
        }
    }
}

module.exports = { nextMiddleware, setMiddleware };