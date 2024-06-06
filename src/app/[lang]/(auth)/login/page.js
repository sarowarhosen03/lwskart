import SocialLogin from "@/components/ui/SocialLogin";
import { getDectionary } from "@/lib/getDictionary";
import { Suspense } from "react";
import LoginFrom from "./LoginFrom";

export default async function loginPage({ params: { lang } }) {
  const dict = await getDectionary(lang);

  return (
    <div className="contain py-16">
      <div className="mx-auto max-w-lg overflow-hidden rounded px-6 py-7 shadow">
        <h2 className="mb-1 text-2xl font-medium uppercase">
          {dict.login.title}
        </h2>
        <p className="mb-6 text-sm text-gray-600">{dict.welcomeBack}</p>

        <Suspense>
          <LoginFrom dict={dict} infoData={dict} />

          <SocialLogin dict={dict} isLoginPage={true} />
        </Suspense>
      </div>
    </div>
  );
}
