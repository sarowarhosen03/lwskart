import SocialLogin from "@/components/ui/SocialLogin";
import { getDectionary } from "@/lib/getDictionary";
import Link from "next/link";
import { Suspense } from "react";
import LoginFrom from "./LoginFrom";

export default async function loginPage({ params: { lang } }) {
  const infoData = await getDectionary(lang);
  return (
    <div className="contain py-16">
      <div className="mx-auto max-w-lg overflow-hidden rounded px-6 py-7 shadow">
        <h2 className="mb-1 text-2xl font-medium uppercase">Login</h2>
        <p className="mb-6 text-sm text-gray-600">{infoData.welcomeBack}</p>

        <Suspense>
          <LoginFrom infoData={infoData} />

          <SocialLogin isLoginPage={true} />
        </Suspense>

        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have account?
          <Link href="/register" className="text-primary">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
