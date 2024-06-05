import ProductList from "@/components/product/ProductList";
import { getDectionary } from "@/lib/getDictionary";

export default async function Page({ params: { lang } }) {
  const dict = await getDectionary(lang, "home");

  return <ProductList dict={dict.trend} lang={lang} />;
}
// export const revaliDateTags = ["products"];
