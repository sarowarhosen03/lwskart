"use server";
import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import Log from "@/utils/Log";
import { getSlug, parsSlug } from "@/utils/slugify";
import { CartItemStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getNewArrivalProducts = async () => {
  try {
    const product = await prisma.Product.findMany({
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
    return product;
  } catch (error) {
    return null;
  }
};
export const getProductByNameAndSku = async (productString) => {
  const [name, sku] = parsSlug(productString);
  try {
    const product = await prisma.product.findFirst({
      where: {
        name: name,
        sku: sku,
      },
      include: {
        brand: true,
        category: true,
      },
    });
    return product;
  } catch (error) {
    return null;
  }
};

export const getRelatedProducts = async ({
  productId,
  categoryId,
  tags,
  price,
}) => {
  try {
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
  } catch (error) {
    return {
      products: [],
      total: 0,
    };
  }
};
export const addToCart = async (productId, quantity = 1, path) => {
  try {
    const session = await auth();
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        stock: true,
        name: true,
        sku: true,
        id: true,
      },
    });
    if (session) {
      const id = session.user.id;
      //select product

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
        revalidateProducts(path, "page");
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
    } else {
      return {
        redirect: `/login?callback=/product/${getSlug({ name: product.name, sku: product.sku })}`,
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

      // await revalidateProducts();
      return {
        success: true,
        payload: cartItem.id,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

function revalidateProducts(path) {
  revalidatePath(path, "page");
}
