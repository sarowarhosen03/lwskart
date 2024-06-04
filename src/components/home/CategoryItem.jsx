import Image from "next/image";
import Link from "next/link";

export default function CategoryItem({ name, thumbnail }) {
  return (
    <Link
      href={`/shop?category=${decodeURIComponent(name)}`}
      className="group relative overflow-hidden rounded-sm "
    >
      <Image
        height={100}
        width={100}
        src={`/assets/images/category/${thumbnail}`}
        alt={thumbnail}
        className="h-full w-full"
      />
      <p className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 font-roboto text-xl font-medium text-white transition group-hover:bg-opacity-60">
        {name}
      </p>
    </Link>
  );
}
