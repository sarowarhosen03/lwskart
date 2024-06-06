"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export default function Modal({ children }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();
  const pathName = usePathname();
  const prevPathName = useRef(pathName);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (prevPathName.current !== pathName) {
      router.back();
    }
  }, [pathName, router]);
  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "unset"; // Re-enable background scrolling
    };
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      onClick={onClick}
      id="default-modal"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        ref={wrapper}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-auto bg-white p-4 shadow-lg"
      >
        {children}
      </div>
    </div>
  );
}
