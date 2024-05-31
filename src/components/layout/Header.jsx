import Image from "next/image";
import Link from "next/link";
import logoImage from "../../../public/assets/images/logo.svg";
import PrimaryNavOptions from "./PrimaryNavOptions";

export default function Header() {
  return (
    <header className="bg-white py-4 shadow-sm  sticky top-0  z-50">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image priority src={logoImage} alt="Logo" className="h-auto w-32 " />
        </Link>

        <div className="relative flex w-full max-w-xl">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            name="search"
            id="search"
            className="hidden w-full rounded-l-md border border-r-0 border-primary py-3 pl-12 pr-3 focus:outline-none md:flex"
            placeholder="search"
          />
          <button className="hidden items-center  rounded-r-md border border-primary bg-primary px-8 text-white transition hover:bg-transparent hover:text-primary md:flex">
            Search
          </button>
        </div>

        <div className="flex gap-2 items-center space-x-4">
          <PrimaryNavOptions />
        </div>
      </div>
    </header>
  );
}
