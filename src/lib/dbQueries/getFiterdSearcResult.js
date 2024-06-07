import prisma from "@/db/db";

export default async function getFilteredSearchResult({
  category = [],
  price = [],
  search = "",
  page = 1,
  limit = 15,
  size = "",
}) {
  const categoryFilter = category.filter((c) => c); // Filter out empty strings
  const minPrice = price[0] ? parseFloat(price[0]) : 0;
  const maxPrice = price[1] ? parseFloat(price[1]) : 1000000;
  let filter = {
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
        size && size !== "all"
          ? {
              sizes: {
                has: size,
              },
            }
          : {},
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
  };
  const products = await prisma.product.findMany({
    ...filter,
    skip: (page - 1) * limit,
    take: limit,
  });
  const pageCount = await prisma.product.count({
    ...filter,
  });

  return {
    products,
    pageCount: Math.ceil(pageCount / limit),
    limit: limit,
    page,
    total: pageCount,
  };
}
