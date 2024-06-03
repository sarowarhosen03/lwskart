"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function LocalLink({ children, href, className, ...props }) {
  const { lang } = useParams();
  return (
    <Link href={`/${lang}${href}`} className={className} {...props}>
      {children}
    </Link>
  );
}
