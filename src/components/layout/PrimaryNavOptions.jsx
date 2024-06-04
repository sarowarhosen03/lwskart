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
  if (profileImageUrl && profileImageUrl.startsWith("https://")) {
    profileImageUrl = `/assets/profile/${profileImageUrl}`;
  }
  profileImageUrl = `/user/${profileImageUrl}`;

  let firstLatter = session?.user?.name?.charAt(0)?.toUpperCase();
  return (
    <>
      <Link
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
        className={`relative text-center text-gray-700 transition hover:text-primary  ${visibility}`}
        href={`/user/profile`}
      >
        <div className="text-2xl">
          {profileImageUrl && session ? (
            <Image
              src={profileImageUrl}
              height={54}
              width={54}
              className="h-auto w-auto  rounded-full ring-primary"
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
