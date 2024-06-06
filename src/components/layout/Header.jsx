import { getDectionary } from "@/lib/getDictionary";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import logoImage from "../../../public/assets/images/logo.svg";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import PrimaryNavOptions from "./PrimaryNavOptions";
import SearchBox from "./SearchBox";

export default async function Header({ lang }) {
  const dict = await getDectionary(lang, "headers");
  return (
    <header className="sticky top-0 z-50  bg-white py-4  shadow-sm">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image priority src={logoImage} alt="Logo" className="h-auto w-32 " />
        </Link>

        <Suspense>
          <SearchBox dict={dict} />
        </Suspense>
        <div className="flex items-center gap-3 space-x-4">
          <Suspense>
            <LanguageSwitcher />
          </Suspense>
          <PrimaryNavOptions dict={dict} />
        </div>
      </div>
    </header>
  );
}
