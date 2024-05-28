"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SocialLogin({ isLoginPage = false }) {
  const supportedSocials = [
    {
      name: "facebook",
      color: "blue",
    },
    {
      name: "google",
      color: "red",
    },
  ];
  return (
    <>
      <div className="relative mt-6 flex justify-center">
        <div className="relative z-10 bg-white px-3 uppercase text-gray-600">
          Or {isLoginPage ? "Login" : "Register"} with
        </div>
        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-6">
        <Image
          onClick={() => signIn("google", { redirectTo: "/" })}
          src={"/assets/images/icons/google.svg"}
          height={34}
          width={34}
          alt="Google"
          className={"h-auto w-auto cursor-pointer"}
        />
        <i className={"fa-brands fa-facebook fa-2x text-[#0866ff]"}></i>
      </div>
    </>
  );
}
