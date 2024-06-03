import { locales } from "@/lib/controler/internationalization";

export function generateStaticParams() {
  return locales.map((lang) => {
    return {
      lang: lang.code,
    };
  });
}
export default function layout({ children }) {
  return <>{children}</>;
}
