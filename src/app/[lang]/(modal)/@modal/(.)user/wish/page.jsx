import { auth } from "@/auth/auth";
import GloblaLoader from "@/components/ui/GloblaLoader";
import Modal from "@/components/ui/Modal";
import prisma from "@/db/db";
import { getDectionary } from "@/lib/getDictionary";
import dynamic from "next/dynamic";

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
  const WishList = dynamic(
    () => import(`@/app/[lang]/(modal)/user/wish/page.js`),
    {
      loading: () => <GloblaLoader />,
    },
  );

  return (
    <Modal>
      <WishList {...{ dictionary, wishList, empty, params: { lang } }} />
    </Modal>
  );
}

export const revalidate = 0;
