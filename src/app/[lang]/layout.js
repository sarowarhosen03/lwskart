import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import { locales } from "@/lib/controler/internationalization";

export function generateStaticParams() {
  return locales.map((lang) => {
    return {
      lang: lang.code,
    };
  });
}
export default function Sublayout({ children, params: { lang } }) {
  return (
    <>
      <Header lang={lang} />
      <NavBar lang={lang} />
      {children}
      <Footer lang={lang} />
    </>
  );
}
