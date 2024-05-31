"use server";
import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import { CartItemStatus } from "@prisma/client";
import { redirect } from "next/navigation";
export const getWishAndCartCount = async (userId) => {
  const cartItemCount = await prisma.cartItems.aggregate({
    _sum: {
      itemCount: true,
    },
    where: {
      userId: userId,
      status: CartItemStatus.available,
    },
  });
  const wishList = await prisma.wishItem.findMany({
    where: {
      userId: userId,
    },
    select: {
      productId: true,
    },
  });

  return {
    cartItemCount: cartItemCount._sum.itemCount,
    wishList: wishList.map((item) => item.productId),
  };
};

export const getWishList = async (userId) => {
  return await prisma.wishItem.findMany({});
};
export const toggleWishItem = async (productId) => {
  const session = await auth();

  if (session) {
    const id = session.user.id;
    const existingWishItem = await prisma.WishItem.findUnique({
      where: {
        productId_userId: {
          productId: productId,
          userId: id,
        },
      },
    });
    if (existingWishItem) {
      await prisma.WishItem.delete({
        where: {
          productId_userId: {
            productId: productId,
            userId: id,
          },
        },
      });
    } else {
      //add new wish item
      await prisma.WishItem.create({
        data: {
          product: {
            connect: {
              id: productId,
            },
          },
          user: {
            connect: {
              id: id,
            },
          },
        },
      });
    }
    // revalidatePath('/')
    return {
      status: "ok ",
    };
  } else {
    redirect("/login");
  }
};
