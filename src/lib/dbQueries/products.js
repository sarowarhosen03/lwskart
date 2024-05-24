"use server"
import prisma from "@/db/db";


export async function getProducts(options) {
    const { page = 1, limit = 15 } = options || {};
    return prisma.Product.findMany({
        skip: 4 + (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function getNewArrivalProducts() {

    return prisma.Product.findMany({
        take: 4,
        orderBy: {
            createdAt: 'desc'
        }
    })
}
export async function getProductByNameAndSku(productString) {

    const [name, sku] = decodeURI(productString).split("-");
    return prisma.product.findFirst({
        where: {
            name: name,
            sku: Number(sku)
        }
    })
}