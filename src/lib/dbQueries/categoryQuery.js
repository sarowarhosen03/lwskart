"use server";
import prisma from "@/db/db";

export default async function getCategories(options = {}) {
  const { page = 1, limit = 6 } = options;
  return await prisma.Category.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
}
