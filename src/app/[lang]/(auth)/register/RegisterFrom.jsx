"use client";

import Alert from "@/components/ui/Alert";
import InputField from "@/components/ui/InputField";
import useAuthntiCated from "@/hooks/useAuthntiCated";
import useShowHidePassword from "@/hooks/useShowHidePassword";
import { register as userRegister } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    getValues,
    setError,
    clearErrors,
    setValue,
    handleSubmit,
  } = useForm();

  useAuthntiCated();
  const router = useRouter();
  const [showPasswordIcon, showPassword] = useShowHidePassword();

  const handleRegister = async (formData) => {
    try {
      const response = await userRegister(formData);
      if (!response.error) {
        setError("formStatus", {
          type: "success",
          message:
            "User registered successfully. Please check your email inbox to verify it.",
        });
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } else {
        setError("formStatus", {
          type: "error",
          message: response.message || "Something went wrong",
        });
      }
    } catch (error) {
      setError("formStatus", {
        type: "error",
        message: error.message,
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        clearErrors();
        handleSubmit(handleRegister)(e);
      }}
      autoComplete="off"
    >
      <div className="space-y-2">
        <InputField
          label="Full Name"
          name="name"
          type="text"
          register={register}
          validation={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            maxLength: {
              value: 30,
              message: "Name must be less than 30 characters",
            },
          }}
          error={errors.name}
          placeholder="Full Name"
        />
        <InputField
          label="Email address"
          name="email"
          type="email"
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
            onBlur: (e) =>
              setValue("email", e.target.value.toLowerCase().trim()),
          }}
          error={errors.email}
          placeholder="youremail@domain.com"
          autoComplete="email"
        />
        <InputField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          register={register}
          validation={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
            maxLength: {
              value: 32,
              message: "Password must be less than 32 characters",
            },
            validate: (value) =>
              value === getValues()?.confirm || "The passwords do not match",
          }}
          error={errors.password}
          placeholder={showPassword ? "password" : "*******"}
          showPasswordIcon={showPasswordIcon}
          autoComplete="new-password"
        />
        <InputField
          label="Confirm password"
          name="confirm"
          type={showPassword ? "text" : "password"}
          register={register}
          validation={{
            required: "Confirm password is required",
            validate: (value) =>
              value === getValues()?.password || "The passwords do not match",
          }}
          error={errors.confirm}
          placeholder={showPassword ? "confirm password" : "*******"}
          showPasswordIcon={showPasswordIcon}
          autoComplete="new-password"
        />
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <input
            {...register("agreement", {
              required:
                "You must agree to our terms and conditions to continue",
              validate: (value) => value === true || "Agreement is required",
            })}
            type="checkbox"
            name="agreement"
            id="agreement"
            className="cursor-pointer rounded-sm text-primary focus:ring-0"
          />
          <label
            htmlFor="agreement"
            className="ml-3 cursor-pointer text-gray-600"
          >
            I have read and agree to the{" "}
            <a href="#" className="text-primary">
              terms & conditions
            </a>
          </label>
        </div>
        <p className="mt-2 text-sm text-pink-600">
          {errors?.agreement?.message}
        </p>
      </div>
      {errors?.formStatus && (
        <Alert
          variant={errors.formStatus.type === "error" ? "danger" : "success"}
          message={errors.formStatus.message}
        />
      )}
      <div className="mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="block w-full rounded border border-primary bg-primary py-2 text-center font-roboto font-medium uppercase text-white transition hover:bg-transparent hover:text-primary disabled:bg-red-400"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </div>
    </form>
  );
}
