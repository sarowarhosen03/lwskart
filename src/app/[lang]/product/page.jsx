"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductPage() {
    const { back } = useRouter();
    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            if (back) {
                back()
            }
        }
        return () => {
            ignore = true;
        }
    })
    return null
}
