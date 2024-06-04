import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useOrigin from "./useOrigin";

export default function useAuthntiCated() {
  const { status } = useSession();
  const origin = useOrigin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  useEffect(() => {
    if (status === "authenticated") {
      const referer = document?.referrer?.includes(origin)
        ? document.referrer
        : "/";
      router.push(callback ? callback : referer);
    }
  }, [status, router, callback, origin]);
}
