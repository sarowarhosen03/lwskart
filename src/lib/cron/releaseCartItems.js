import prisma from "@/db/db";
import { CartItemStatus } from "@prisma/client";

export default async function releaseCartItems() {
  const cartItemsToUpdate = await prisma.CartItems.findMany({
    where: {
      status: CartItemStatus.available,
      updatedAt: {
        lt: new Date(Date.now() - 1000 * 60 * 20), // Select items updated more than 20 minutes ago
      },
      product: {
        stock: {
          lt: 10, // Select products with stock less than 10
        },
      },
    },
    include: {
      product: true,
    },
  });

  const transactionOperations = cartItemsToUpdate
    .map((cartItem) => {
      return [
        prisma.Product.update({
          where: { id: cartItem.productId },
          data: {
            stock: { increment: cartItem.itemCount },
            availability: true,
          },
        }),
        prisma.CartItems.update({
          where: { id: cartItem.id },
          data: {
            itemCount: { decrement: cartItem.itemCount },
            status: CartItemStatus.outOfStock,
          },
        }),
      ];
    })
    .flat();
  return await prisma.$transaction(transactionOperations);
}
export const runCleaner = async () => {
  if (
    process.env.NODE_ENV === "production" &&
    !process.env?.NEXT_IS_EXPORT_WORKER
  ) {
    try {
      fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/cron", {
        next: {
          revalidate: 5 * 60,
        },
      });
    } catch (error) {}
  }
};
