import prisma from "@/db/db";
import { getSlug } from "@/utils/slugify";

export default async function sitemap() {
  const products = await prisma.product.findMany({
    select: {
      name: true,
      sku: true,
      updatedAt: true,
    },
  });
  return products.map(({ name, sku, updatedAt }) => ({
    url: `${process.env.SITE_URL}/product/${getSlug({ name, sku })}`,
    lastModified: updatedAt,
    changeFrequency: "monthly",
    priority: 1,
  }));
}
