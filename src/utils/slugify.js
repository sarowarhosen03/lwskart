export function getSlug({ name, sku }) {
  return encodeURIComponent(name + "_sku_" + sku);
}
export function parsSlug(slug) {
  let decoded = decodeURIComponent(slug).split("_sku_");
  return [decoded[0], Number(decoded[1])];
}
