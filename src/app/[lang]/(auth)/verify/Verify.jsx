"use client";
import Alert from "@/components/ui/Alert";
import { verifyEmail } from "@/lib/actions/authActions";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Verify({ dict }) {
  const router = useRouter();
  const urlsearchPerms = useSearchParams();

  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState();
  const token = urlsearchPerms.get("token");
  const email = urlsearchPerms.get("email");

  const handleVerify = async () => {
    try {
      setIsPending(true);
      const verifyResponse = await verifyEmail({ token, email });
      setResponse(verifyResponse);
      if (!verifyResponse?.error) {
        setTimeout(() => router.push(`/login?email=${email}`), 3000);
      }
    } catch (error) {
      setResponse({
        error: true,
        message: error.message,
      });
      setIsPending(false);
    }
  };
  if (!(token || email || router?.push)) {
    // router.push("/login");
  }
  let iconName = "verification.svg";
  if (response?.error) {
    iconName = "error.svg";
  } else if (response?.error == false) {
    iconName = "done.svg";
  }

  return (
    <div className=" flex min-h-56 flex-col items-center justify-center space-y-5  capitalize">
      <Image
        priority
        src={`/assets/images/icons/${iconName}`}
        height={100}
        width={100}
        alt="status icon"
        className="size-15"
      />
      {!!response?.message && (
        <div className=" mx-6">
          <Alert
            variant={response?.error ? "danger" : "success"}
            message={response?.message.trim()}
          />
        </div>
      )}
      {!!!response?.message && <p>{dict.message}</p>}

      {!response && (
        <button
          onClick={handleVerify}
          disabled={!!isPending}
          className=" rounded-md bg-primary p-2 text-white shadow-sm  disabled:bg-red-400"
        >
          {dict.btn}
        </button>
      )}
    </div>
  );
}
