"use server";
import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import Log from "@/utils/Log";
import { CartItemStatus } from "@prisma/client";
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

export const getNewArrivalProducts = unstable_cache(async () => {
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
}, ["products"]);
export const getProductByNameAndSku = unstable_cache(
  async (productString) => {
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

        const productUpdateData = {
          availability,
          stock: newStock,
        };

        const [cartRes, productRes] = await prisma.$transaction([
          prisma.cartItems.upsert({
            where: {
              productId_userId: {
                productId: productId,
                userId: id,
              },
            },
            update: {
              itemCount: { increment: availableToPurchase },
              status: CartItemStatus.available,
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
        revalidateTag("products");
        return {
          success: true,
          data: {
            productId: productId,
            quantity: availableToPurchase,
            availability,
          },
          payload: {
            ...cartRes,
            product: {
              ...productRes,
            },
          },
        };
      }
    }
  } catch (error) {
    Log(error);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
export const deleteCartItem = async (cartId) => {
  try {
    const session = await auth();
    if (session) {
      const cartItem = await prisma.cartItems.findUnique({
        where: {
          id: cartId,
        },
      });

      await prisma.$transaction([
        prisma.cartItems.delete({
          where: {
            id: cartId,
          },
        }),
        prisma.product.update({
          where: {
            id: cartItem.productId,
          },
          data: {
            stock: {
              increment: cartItem.itemCount,
            },
            availability: true,
          },
        }),
      ]);

      revalidateTag(["products"]);
      return {
        success: true,
        payload: cartItem.id,
      };
    }
  } catch (error) {
    Log(error);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
