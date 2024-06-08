import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import { getDectionary } from "@/lib/getDictionary";

export default async function Page({ params: { lang } }) {
  const dict = await getDectionary(lang, "home");

  return (
    <>
      <Banner dict={dict.hero} />
      <Features feature={dict.feature} />
    </>
  );
}
