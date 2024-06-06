import { auth } from "@/auth/auth";
import WishList from "@/components/WishList";
import Modal from "@/components/ui/Modal";
import prisma from "@/db/db";
import { getDectionary } from "@/lib/getDictionary";

export default async function wishPage({ params: { lang } }) {
  const sessin = await auth();
  const wishList = await prisma.WishItem.findMany({
    where: {
      userId: sessin?.user.id,
    },
    include: {
      product: {
        select: {
          id: true,
          sku: true,
          name: true,
          image: true,
          availability: true,
          stock: true,
        },
      },
    },
  });
  const dictionary = await getDectionary(lang, "product");
  const { empty } = await getDectionary(lang, "wishlist");

  return (
    <Modal>
      <WishList {...{ dictionary, wishList, empty }} />
    </Modal>
  );
}

export const revalidate = 0;
