import Image from "next/image";
import Link from "next/link";
import logoImage from "../../../public/assets/images/logo.svg";
import PrimaryNavOptions from "./PrimaryNavOptions";
import SearchBox from "./SearchBox";

export default function Header() {
  return (
    <header className="sticky top-0 z-50  bg-white py-4  shadow-sm">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image priority src={logoImage} alt="Logo" className="h-auto w-32 " />
        </Link>

        <SearchBox />

        <div className="flex items-center gap-2 space-x-4">
          <PrimaryNavOptions />
        </div>
      </div>
    </header>
  );
}
