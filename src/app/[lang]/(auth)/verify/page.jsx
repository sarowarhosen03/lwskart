import { getDectionary } from "@/lib/getDictionary";
import { Suspense } from "react";
import Verify from "./Verify";

export default async function VerifyPage({ params: { lang } }) {
  const dict = await getDectionary(lang,'verify')
  return (
    <Suspense>
      <Verify dict={dict}/>
    </Suspense>
  );
}
