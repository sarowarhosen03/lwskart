import AppContextProvider from "@/context";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SessionProvider } from "next-auth/react";
import { Poppins, Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import { locales } from "@/lib/controler/internationalization";
import { runCleaner } from "@/lib/cron/releaseCartItems";
import { getDectionary } from "@/lib/getDictionary";

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export async function generateMetadata({ params: { lang } }) {
  const dict = await getDectionary(lang, "home");
  return {
    title: dict.hero.title,
    description: dict.hero.subTitle,
    image: "public/assets/images/logo.svg",
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL,
  };
}

export function generateStaticParams() {
  return locales.map((lang) => {
    return {
      lang: lang.code,
    };
  });
}

export default async function Sublayout({ children, params: { lang }, modal }) {
  await runCleaner();

  return (
    <SessionProvider>
      <AppContextProvider>
        <Header lang={lang} />
        <NavBar lang={lang} />
        {modal}

        {children}
        <Footer lang={lang} />
        <ToastContainer position="bottom-center" limit={2} />
      </AppContextProvider>
    </SessionProvider>
  );
}
