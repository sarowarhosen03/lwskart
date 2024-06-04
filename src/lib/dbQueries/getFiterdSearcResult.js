import prisma from "@/db/db";
import { getNewArrivalProducts } from "./products";

export default async function getFilteredSearchResult({
  category = [],
  price = [],
  search = "",
}) {
  const categoryFilter = category.filter((c) => c); // Filter out empty strings
  const minPrice = price[0] ? parseFloat(price[0]) : 0;
  const maxPrice = price[1] ? parseFloat(price[1]) : 1000000;
  if (
    !categoryFilter.length &&
    minPrice === 0 &&
    maxPrice === 1000000 &&
    search === ""
  ) {
    return await getNewArrivalProducts();
  }
  const products = await prisma.product.findMany({
    where: {
      AND: [
        categoryFilter.length > 0
          ? {
              category: {
                name: {
                  in: categoryFilter,
                },
              },
            }
          : {}, // Ignore the category filter if empty
        {
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
        {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    },
    include: {
      category: true,
    },
  });

  return products;
}
