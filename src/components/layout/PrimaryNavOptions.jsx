"use client";
import { useAppContext } from "@/context";
import getColorCodeByLatter from "@/utils/getColorCodeByLatter";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PrimaryNavOptions({ dict }) {
  const { status, data: session } = useSession();
  const isAuthorized = status === "authenticated";
  const visibility = isAuthorized ? "visible" : "invisible";
  const {
    state: { wishList, cartList },
  } = useAppContext();
  const { lang } = useParams();
  let profileImageUrl = session?.user?.image;
  if (!profileImageUrl) profileImageUrl = "/user/avatar-svgrepo-com.svg";

  let firstLatter = session?.user?.name?.charAt(0)?.toUpperCase();
  return (
    <>
      <Link
        prefetch={false}
        href={`/${lang}/user/wish`}
        className={`relative text-center text-gray-700 transition hover:text-primary ${visibility} `}
      >
        <div className="text-2xl">
          <i className="fa-regular fa-heart"></i>
        </div>
        <div className="text-xs leading-3">{dict.wishlist}</div>
        <div className="absolute -top-1 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
          {wishList.length}
        </div>
      </Link>
      <Link
        prefetch={false}
        key={"cartlist"}
        href={`/${lang}/user/cart`}
        className={`relative text-center text-gray-700 transition hover:text-primary ${visibility} `}
      >
        <div className="text-2xl">
          <i className="fa-solid fa-bag-shopping"></i>
        </div>
        <div className="text-xs leading-3">{dict.cart}</div>
        <div className="absolute -right-3 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
          {cartList.length}
        </div>
      </Link>
      <Link
        prefetch={false}
        key={"profile"}
        className={`relative text-center text-gray-700 transition hover:text-primary  ${visibility}`}
        href={`/${lang}/user/profile`}
      >
        <div className="peer text-2xl">
          {profileImageUrl && session ? (
            <Image
              placeholder="blur"
              blurDataURL="/user/avatar-svgrepo-com.svg"
              src={profileImageUrl}
              height={54}
              width={54}
              className=" h-45 w-45 rounded-full object-cover  ring-primary"
              alt="profile image "
              priority
            />
          ) : (
            <div
              style={{
                backgroundColor: getColorCodeByLatter(firstLatter),
              }}
              className="mx-auto  size-[34px] rounded-full  text-center  text-white"
            >
              {firstLatter}
            </div>
          )}
        </div>

        <div className="text-xs leading-3">{session?.user?.name}</div>
      </Link>
    </>
  );
}
