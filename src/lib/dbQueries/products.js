"use server";
import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import { revalidateTag, unstable_cache } from "next/cache";

export const getProducts = unstable_cache(
  async function (options) {
    const { page = 1, limit = 15 } = options || {};
    return prisma.Product.findMany({
      skip: 4 + (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        wishItem: {
          select: {
            userId: true,
          },
        },
      },
    });
  },
  {
    tags: ["products"],
  },
);

export async function getNewArrivalProducts() {
  return prisma.Product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },

    include: {
      wishItem: {
        select: {
          userId: true,
        },
      },
    },
  });
}
export const getProductByNameAndSku = unstable_cache(
  (productString) => {
    const [name, sku] = decodeURI(productString).split("-");
    return prisma.product.findFirst({
      where: {
        name: name,
        sku: Number(sku),
      },
      include: {
        brand: true,
        category: true,
      },
    });
  },
  {
    tags: ["products"],
  },
);

export const getRelatedProducts = unstable_cache(
  async ({ productId, categoryId, tags, price }) => {
    const priceRange = {
      min: price * 0.1,
      max: price * 2.5,
    };

    // Define the criteria for related products matching both category and tags
    const relatedProductCriteriaBoth = {
      id: { not: productId },
      categoryId,
      tags: { hasSome: tags },
      price: {
        gte: priceRange.min,
        lte: priceRange.max,
      },
      availability: true,
    };
    // Define the criteria for related products matching either category or tags
    const relatedProductCriteriaEither = {
      id: { not: productId },
      OR: [{ categoryId }, { tags: { hasSome: tags } }],
      price: {
        gte: priceRange.min,
        lte: priceRange.max,
      },
      availability: true,
    };

    // First, try to find products matching both criteria
    let totalCount = await prisma.product.count({
      where: relatedProductCriteriaBoth,
    });

    let relatedProducts = [];

    // If no products match both criteria, fallback to matching either criteria
    if (totalCount === 0) {
      totalCount = await prisma.product.count({
        where: relatedProductCriteriaEither,
      });

      relatedProducts = await prisma.product.findMany({
        where: relatedProductCriteriaEither,

        take: 10,
      });
    } else {
      relatedProducts = await prisma.product.findMany({
        where: relatedProductCriteriaBoth,

        take: 10,
      });
    }

    return {
      products: relatedProducts,
      total: totalCount,
    };
  },
  {
    tags: ["products"],
  },
);

export const addToCart = async (productId, quantity = 1) => {
  try {
    const session = await auth();
    if (session) {
      const id = session.user.id;
      //select product
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
      if (product) {
        const availableToPurchase = Math.min(product.stock, quantity);
        const newStock = product.stock - availableToPurchase;
        const availability = newStock > 0;
        if (availableToPurchase > 0) {
          const CartItems = await prisma.CartItems.findFirst({
            where: {
              productId: productId,
              userId: id,
            },
          });

          const productUpdateData = {
            availability,
            stock: newStock,
          };

          await prisma.$transaction([
            prisma.cartItems.upsert({
              where: {
                productId_userId: {
                  productId: productId,
                  userId: id,
                },
              },
              update: {
                itemCount: (CartItems?.itemCount || 0) + availableToPurchase,
              },
              create: {
                product: {
                  connect: { id: productId },
                },
                User: {
                  connect: { id: id },
                },
                itemCount: availableToPurchase,
              },
            }),

            prisma.product.update({
              where: {
                id: productId,
              },
              data: productUpdateData,
            }),
          ]);
          revalidateTag(["products"]);

          return {
            success: true,
            data: {
              productId: productId,
              quantity: availableToPurchase,
              availability,
            },
          };
        } else {

          return {
            error: "Out of stock",
          };
        }
      }
    }
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
