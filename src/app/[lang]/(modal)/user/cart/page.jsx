import { getDectionary } from "@/lib/getDictionary";
import CartOverView from "./CartOverView";

export default async function CartPage({ params: { lang } }) {
  const cartDict = await getDectionary(lang, "cart");
  return (
    <>
      <CartOverView cartDict={cartDict} />
    </>
  );
}
