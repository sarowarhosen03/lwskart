"use server";
import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import { redirect } from "next/navigation";
import { addToCart } from "./products";
export const getWishAndCartCount = async (userId) => {
  const cartItemList = await prisma.cartItems.findMany({
    where: {
      userId: userId,
    },
    include: {
      product: true,
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
    wishList: wishList.map((item) => item.productId),
    cartItemList: cartItemList,
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
export const updateProfile = async (body, id) => {
  const { name, phone, shippingAddress, billingAddress, image } = body;
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,

      phone: phone,
      image: image,
      address: { shippingAddress, billingAddress },
    },
  });
  return {
    status: "ok ",
  };
};

export const removeCartItem = async (productId) => {
  const session = await auth();
  if (session) {
    const id = session.user.id;
    await prisma.cartItems.delete({
      where: {
        productId_userId: {
          productId: productId,
          userId: id,
        },
      },
    });
    return {
      status: "ok ",
    };
  } else {
    redirect("/login");
  }
};
export const changeCartItemCount = async (productId, itemCount,stock) => {
  c
  const session = await auth();
  if (session) {
    try {
      const id = session.user.id;
      const newStock = stock - itemCount;
      await addToCart(productId,)
      return {
        status: "ok ",
      };
    } catch (error) {
      return {
        error: true,
      };
    }
  } else {
    redirect("/login");
  }
};
