"use server";
import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
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
export const toggleWishItem = async (productId, path, skip = false) => {
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
    //if trigger form login page only add no toggle
    if (skip && existingWishItem) {
      return {
        status: "ok ",
        message: "already in wish list",
      };
    }
    let action = "Added";
    if (existingWishItem) {
      action = "Removed";
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
    revalidatePath("/[lang]/user/wish", "page");

    return {
      status: "ok ",
      message: `wish item ${action} Successfully`,
    };
  } else {
    return {
      redirect: `/login?callback=${path}&type=wish&id=${productId}`,
    };
  }
};
export const updateProfile = async (body, id) => {
  const {
    name,
    phone,
    shippingAddress,
    billingAddress,
    image,
    company,
    email,
  } = body;
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      company,
      email,
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
export const getUserInfo = async () => {
  const id = headers().get("userId");
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      address: true,
      email: true,
      company: true,
    },
  });
};
export const getInvoice = async (orderid) => {
  try {
    const userId = headers().get("userId");
    const order = await prisma.order.findUnique({
      where: {
        id: orderid,
      },
      select: {
        id: true,
        customerId: true,
        invoice: true,
      },
    });
    return {
      isAthorized: userId === order.customerId,
      order: order,
    };
  } catch (error) {
    return {};
  }
};
