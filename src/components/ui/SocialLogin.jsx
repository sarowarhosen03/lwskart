"use client";
import useAuthntiCated from "@/hooks/useAuthntiCated";
import { redirectFromServer } from "@/lib/actions/redirect";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Alert from "./Alert";

export default function SocialLogin({ dict, isLoginPage = false }) {
  const searchPersms = useSearchParams();
  const errorFromOuth = searchPersms.get("error");
  const [error, setError] = useState("");
  const { status, rerefLink } = useAuthntiCated();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push(rerefLink);
    }
  }, [status, router, rerefLink]);
  useEffect(() => {
    if (errorFromOuth === "OAuthAccountNotLinked") {
      setError(
        "To confirm your identity, sign in with the same account you used originally",
      );
    }
  }, [errorFromOuth, setError]);
  return (
    <>
      <div className="relative mt-6 flex justify-center">
        <div className="relative z-10 bg-white px-3 uppercase text-gray-600">
          {isLoginPage ? dict.login.with : dict.register.with}
        </div>
        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
      </div>
      {error && <Alert variant="danger" message={error} />}
      <div className="mt-4 flex w-full items-center justify-center gap-6">
        <Image
          title="login with google"
          onClick={() => signIn("google")}
          src={"/assets/images/icons/google.svg"}
          height={34}
          width={34}
          alt="Google"
          className={"h-auto w-auto cursor-pointer"}
        />
        <i
          title="login with facebook"
          onClick={() => signIn("facebook")}
          className={
            "fa-brands fa-facebook fa-2x cursor-pointers text-[#0866ff]"
          }
        ></i>
        <i
          title="login with discord"
          onClick={() => signIn("discord")}
          className={"fa-brands fa-discord fa-2x cursor-pointer text-[#0866ff]"}
        ></i>
      </div>
      <p className="mt-4 text-center text-gray-600">
        {isLoginPage ? dict.login.notAccount : dict.register.already}

        {!isLoginPage && (
          <button
            key={"register"}
            onClick={async (e) => {
              redirectFromServer("/login");
            }}
            className="ms-2 text-primary"
          >
            {dict.login.title}
          </button>
        )}
        {isLoginPage && (
          <button
            key={"login"}
            onClick={async (e) => {
              redirectFromServer("/register");
            }}
            className="ms-2 text-primary"
          >
            {dict.register.title}
          </button>
        )}
      </p>
    </>
  );
}
