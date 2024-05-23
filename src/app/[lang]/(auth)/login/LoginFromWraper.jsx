"use client";
import { loginAction } from "@/lib/actions/authActions";
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
export default function LoginFromWraper({ infoData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    formState: { isSubmitting },
    setError,
  } = useForm();
  const router = useRouter();
  const searchPerams = useSearchParams();
  const callback = searchPerams.get("callback");
  const data = useSession()
  console.log(data);
  async function handleLogin(data) {
    try {
      const res = await loginAction(data);
      if (!res?.error) {
        return router.push(callback ? callback : "/");
      }

      if (res?.payload?.message?.includes("Incorrect password")) {
        return setError('password', {
          message: res.payload.message
        })
      }
      throw new Error(res?.payload.message)

    } catch (error) {
      setError("formStatus", {
        type: "error",
        message: error.message,
      });
    }
  }

  return (
    <form
      onSubmit={(e) => {
        clearErrors();
        handleSubmit(handleLogin)(e);
      }}
      autoComplete="off"
    >
      <div className="space-y-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-gray-600">
            {infoData.email}
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            type="email"
            name="email"
            id="email"
            className=" peer block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 invalid:border-pink-500 invalid:text-pink-600 focus:border-primary  focus:ring-0  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            placeholder="youremail.com@domain.com"
          />
          <p className="mt-2  text-sm text-pink-600">
            {errors?.email?.message}
          </p>
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-gray-600">
            {infoData.password}
          </label>
          <input
            {...register("password", {
              required: "Password is required",

            })}
            type="password"
            name="password"
            id="password"
            className=" block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            placeholder="*******"
          />
          <p className="mt-2   text-sm text-pink-600">
            {errors?.password?.message}
          </p>
        </div>
      </div>
      <div className="mt-6 flex  items-center justify-between">
        <div className="flex items-center">
          <input
            {...register("remember", {})}
            type="checkbox"
            name="remember"
            id="remember"
            className="cursor-pointer rounded-sm text-primary focus:ring-0"
          />
          <label
            htmlFor="remember"
            className="ml-3 cursor-pointer text-gray-600"
          >
            Remember me
          </label>
        </div>
        <Link href="/" className="text-primary">
          Forgot password
        </Link>
      </div>
      {errors?.formStatus && (
        <div className="mt-4 text-center ">
          <p
            className={`rounded-sm ${errors.formStatus.type == "error" ? "bg-red-500" : "bg-green-500"} py-3 text-sm font-bold capitalize text-white transition-all  duration-75`}
          >
            {errors?.formStatus.message}
          </p>
        </div>
      )}

      <div className="mt-4">
        <button
          disabled={isSubmitting}
          type="submit"
          className=" block w-full rounded  border border-primary bg-primary py-2 text-center font-roboto font-medium uppercase text-white transition hover:bg-transparent hover:text-primary disabled:bg-red-300"
        >
          Login
        </button>
      </div>
    </form>
  );
}
