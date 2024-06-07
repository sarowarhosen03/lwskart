"use client";

import Alert from "@/components/ui/Alert";
import InputField from "@/components/ui/InputField";
import useAddToCart from "@/hooks/useAddToCart";
import useShowHidePassword from "@/hooks/useShowHidePassword";
import useWish from "@/hooks/useWish";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginForm({ infoData }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
    setValue,
  } = useForm();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const callback = searchParams.get("callback");
  const quantity = searchParams.get("quantity");

  const { handleAddToCart } = useAddToCart(id, true, quantity);
  const [handleToggleWish] = useWish(id, true);
  const router = useRouter();
  const [showPasswordIcon, showPassword] = useShowHidePassword();
  const email = searchParams.get("email");
  if (email) {
    setValue("email", email);
  }

  async function handleLogin(data) {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (!res?.error) {
        if (type === "cart") {
          await handleAddToCart();
        } else if (type === "wish") {
          await handleToggleWish();
        }
        router.push(callback || "/");
        router.refresh();
      } else if (res.error === "AccessDenied") {
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
        <InputField
          label={infoData.email}
          name="email"
          type="email"
          autoComplete="username"
          register={register}
          validation={{
            required: infoData.login.emailRequiredError,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: infoData.login.invalid,
            },
            onBlur: (e) =>
              setValue("email", e.target.value.toLowerCase().trim()),
          }}
          error={errors.email}
          placeholder="youremail.com@domain.com"
        />
        <InputField
          label={infoData.password}
          name="password"
          type={showPassword ? "text" : "password"}
          register={register}
          validation={{ required: infoData.login.passwordRequiredError }}
          error={errors.password}
          placeholder={showPassword ? infoData.password : "*******"}
          autoComplete="password"
          showPasswordIcon={showPasswordIcon}
        />
      </div>
      <div className="mt-6 flex items-center justify-between">
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
            {infoData.login.rememberMeLabel}
          </label>
        </div>
        <Link href="/" className="text-primary">
          {infoData.login.forgotPasswordLink}
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
          className="block w-full rounded border border-primary bg-primary py-2 text-center font-roboto font-medium uppercase text-white transition hover:bg-transparent hover:text-primary disabled:bg-red-300"
        >
          {isSubmitting ? infoData.login.loginInProgress : infoData.login.title}
        </button>
      </div>
    </form>
  );
}
