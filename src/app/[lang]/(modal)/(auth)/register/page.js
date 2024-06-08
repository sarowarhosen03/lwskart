import SocialLogin from "@/components/ui/SocialLogin";
import { getDectionary } from "@/lib/getDictionary.js";
import { Suspense } from "react";
import RegisterFrom from "./RegisterFrom.jsx";

export default async function registerPage({ params: { lang } }) {
  const dict = await getDectionary(lang);

  return (
    <div className="contain py-16">
      <div className="mx-auto max-w-lg overflow-hidden rounded px-6 py-7 shadow">
        <h2 className="mb-1 text-2xl font-medium uppercase">
          {dict.register.create}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          {dict.register.newCustomer}
        </p>

        <Suspense>
          <RegisterFrom dict={dict} />
          <SocialLogin dict={dict} />
        </Suspense>
      </div>
    </div>
  );
}
