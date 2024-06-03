import SocialLogin from "@/components/ui/SocialLogin";
import Link from "next/link";
import { Suspense } from "react";
import RegisterFrom from "./RegisterFrom.jsx";

export default function registerPage() {
  return (
    <div className="contain py-16">
      <div className="mx-auto max-w-lg overflow-hidden rounded px-6 py-7 shadow">
        <h2 className="mb-1 text-2xl font-medium uppercase">
          Create an account
        </h2>
        <p className="mb-6 text-sm text-gray-600">Register for new cosutumer</p>

        <Suspense>
          <RegisterFrom />
          <SocialLogin />
        </Suspense>
        <p className="mt-4 text-center text-gray-600">
          Already have account?{" "}
          <Link href="/login" className="text-primary">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
}
