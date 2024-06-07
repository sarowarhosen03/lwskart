"use server";
import prisma from "@/db/db";
import { cache } from "react";
const TREINDING_LIMIT = 20;
export async function getTrendingProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        soldCount: "desc",
      },
      take: TREINDING_LIMIT,
    });
    return products;
  } catch (error) {
    return [];
  }
}

export const getSizes = cache(async () => {
  try {
    const sizes = await prisma.product.findMany({
      select: { sizes: true },
    });
    const seize = await sizes.reduce((acc, curr) => {
      if (curr?.sizes) {
        for (const size of curr.sizes) {
          if (!acc.includes(size)) {
            acc.push(size);
          }
        }
      }
      return acc;
    }, []);

    return seize;
  } catch (error) {
    return [];
  }
});
