import Categories from "@/components/home/Categories";
import NewArrival from "@/components/home/NewArrival";
import { getDectionary } from "@/lib/getDictionary";

export default async function Page({ params: { lang } }) {
  const dict = await getDectionary(lang, "home");

  return (
    <>
      <Categories dict={dict} />
      <NewArrival dict={dict} lang={lang} />
    </>
  );
}
export const revalidate = 0;
