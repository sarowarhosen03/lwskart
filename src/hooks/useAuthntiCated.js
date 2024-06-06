import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { document } from "postcss";
import { useEffect, useState } from "react";
import useOrigin from "./useOrigin";

export default function useAuthntiCated() {
  const { status } = useSession();
  const origin = useOrigin();
  const [rerefLink, setReferLink] = useState("/");
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  useEffect(() => {
    if (status === "authenticated") {
      const refererUrl = document?.referer;
      const referer =
        refererUrl?.includes(origin) &&
        (!refererUrl?.includes("login") || !refererUrl?.includes("register"))
          ? document.referrer
          : "/";
      setReferLink(callback ? callback : referer);
    }
  }, [status, callback, origin]);
  return { status, rerefLink };
}
