export function getSlug({ name, sku }) {
    return encodeURI(name + "-" + sku)
}
export function parsSlug(slug) {
    return decodeURI(slug).split("-")
}
