const { PrismaClient } = require("@prisma/client");

(async () => {
  const prisma = await new PrismaClient();
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const prodctus = await prisma.product.findMany({});
  prodctus.forEach(async (product) => {
    await prisma.product.update({
      where: { id: product.id },
      data: {
        sizes: sizes.slice(
          Math.floor(Math.random() * 7),
          Math.floor(Math.random() * 7),
        ),
      },
    });
  });
})();
