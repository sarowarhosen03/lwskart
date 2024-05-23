"use client";

import { verifyEmail } from "@/lib/actions/authActions";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const urlsearchPerms = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const [response, setRespons] = useState();
  const token = urlsearchPerms.get("token");
  const email = urlsearchPerms.get("email");
  const handelVerify = async () => {
    try {
      setIsPending(true);
      const verifyResponse = await verifyEmail({ token, email });
      setRespons(verifyResponse);
      if (!verifyResponse?.error) {
        setTimeout(() => router.push(`/login?email=${email}`), 3000)
      }
    } catch (error) {
      setRespons({
        error: true,
        message: error.message
      })
      setIsPending(false);

    }

  };
  if (!(token || email || router?.push)) {
    router.push("/login");
  }
  let iconName = "verification.svg";
  if (response?.error) {
    iconName = "error.svg";
  } else if (response?.error == false) {
    iconName = "done.svg";
  }

  return (
    <div className="flex min-h-56 flex-col items-center justify-center space-y-5 capitalize">
      <Image
        priority
        src={`/assets/images/icons/${iconName}`}
        height={100}
        width={100}
        alt="status icon"
        className="size-15"
      />
      {response?.message ? <p className="text-xl">{response?.message}</p> : <p>Click the button below to verify your email adress</p>}



      {
        !response && <button
          onClick={handelVerify}
          disabled={!!isPending}
          className=" rounded-md bg-primary p-2 text-white shadow-sm  disabled:bg-red-400"
        >
          Verify Email
        </button>
      }
    </div >
  );
}
