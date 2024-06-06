import GloblaLoader from "@/components/ui/GloblaLoader";
import Modal from "@/components/ui/Modal";
import { getDectionary } from "@/lib/getDictionary";
import dynamic from "next/dynamic";

export default async function page({ params: { lang } }) {
  const cartDict = await getDectionary(lang, "cart");
  const CartOverView = dynamic(
    () => import(`@/app/[lang]/user/cart/CartOverView`),
    {
      loading: () => <GloblaLoader />,
    },
  );
  return (
    <Modal>
      <CartOverView cartDict={cartDict} />
    </Modal>
  );
}
