export function getSlug({ name, sku }) {
  return encodeURIComponent(name.split(" ").join("_") + "_sku_" + sku);
}
export function parsSlug(slug) {
  let decoded = decodeURIComponent(slug).split("_sku_");
  return [decoded[0].split("_").join(" "), Number(decoded[1])];
}
