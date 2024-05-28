"use client";
import Alert from "@/components/ui/Alert";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useShowHidePassword from "@/hooks/useShowHidePassword";
import { useEffect } from "react";

export default function LoginFrom({ infoData }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
    setValue,
  } = useForm();
  const [showPasswordIcon, showPassword] = useShowHidePassword();

  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    const referer = document.referrer;
    if (status === "authenticated") {
      router.push(referer ? referer : "/");
    }
  }, [status, router]);

  async function handleLogin(data) {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res.error === "AccessDenied") {
        return setError("formStatus", {
          type: "error",
          message:
            "please verify your email first , we resend the verification link to your email",
        });
      } else if (res.error) {
        setError("formStatus", {
          type: "error",
          message: "please check your email and password are correct",
        });
      }
    } catch (error) {
      // console.log(error);
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
              onBlur: (e) => {
                return setValue("email", e.target.value.toLowerCase().trim());
              },
            })}
            type="email"
            name="email"
            id="email"
            autoComplete="username"
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
          <div className="flex">
            <input
              autoComplete={"new-password"}
              {...register("password", {
                required: "Password is required",
              })}
              name="password"
              id="password"
              className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
              type={showPassword ? "text" : "password"}
              placeholder={showPassword ? "password" : "*******"}
            />
            {showPasswordIcon}
          </div>
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
        <Alert
          variant={errors.formStatus.type === "error" ? "danger" : "success"}
          message={errors.formStatus.message}
        />
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
