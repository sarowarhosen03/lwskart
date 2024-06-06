import { Suspense } from "react";
import SocialLogin from "../ui/SocialLogin";
import LoginForm from "./LoginFrom";

export default function Login({ dict }) {
  return (
    <div className="contain bg-white py-16">
      <div className="mx-auto max-w-lg overflow-hidden rounded px-6 py-7 shadow">
        <h2 className="mb-1 text-2xl font-medium uppercase">
          {dict.login.title}
        </h2>
        <p className="mb-6 text-sm text-gray-600">{dict.welcomeBack}</p>

        <Suspense>
          <LoginForm dict={dict} infoData={dict} />

          <SocialLogin dict={dict} isLoginPage={true} />
        </Suspense>
      </div>
    </div>
  );
}
