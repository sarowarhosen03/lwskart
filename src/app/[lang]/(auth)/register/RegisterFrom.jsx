"use client";
import Alert from "@/components/ui/Alert";
import useAuthntiCated from "@/hooks/useAuthntiCated";
import useShowHidePassword from "@/hooks/useShowHidePassword";
import { register as userRegister } from "@/lib/actions/authActions";
import { useForm } from "react-hook-form";

export default function RegisterFrom() {
  const {
    register,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
    formState: { isSubmitting },
    setValue,
    handleSubmit,
  } = useForm();
  useAuthntiCated()
  const [showPasswordIcon, showPassword] = useShowHidePassword();
  const handelRegister = async (fromData) => {
    try {
      const response = await userRegister(fromData);
      if (!response.error) {
        setError("formStatus", {
          type: "success",
          message:
            "user registered successfully please check your email inbox to verify it",
        });
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
        handleSubmit(handelRegister)(e);
      }}
      autoComplete="off"
    >
      <div className="space-y-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-gray-600">
            Full Name
          </label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Name must be less than 20 characters",
              },
            })}
            type="text"
            name="name"
            id="name"
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            placeholder="fulan fulana"
          />
          <p className="mt-2  text-sm text-pink-600">{errors?.name?.message}</p>
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-gray-600">
            Email address
          </label>
          <input
            autoComplete={"email"}
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
            className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            placeholder="youremail.@domain.com"
          />

          <p className="mt-2  text-sm text-pink-600">
            {errors?.email?.message}
          </p>
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-gray-600">
            Password
          </label>
          <div className="flex">
            <input
              autoComplete={"new-password"}
              {...register("password", {
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
                  value === getValues()?.confirm ||
                  "The passwords do not match",
              })}
              name="password"
              id="password"
              className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
              type={showPassword ? "text" : "password"}
              placeholder={showPassword ? "password" : "*******"}
            />
            {showPasswordIcon}
          </div>
          <p className="mt-2  text-sm text-pink-600">
            {errors?.password?.message}
          </p>
        </div>
        <div>
          <label htmlFor="confirm" className="mb-2 block text-gray-600">
            Confirm password
          </label>
          <div className="flex">
            <input
              autoComplete={"new-password"}
              {...register("confirm", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === getValues()?.password ||
                  "The passwords do not match",
              })}
              type={showPassword ? "text" : "password"}
              placeholder={showPassword ? "confirm password" : "*******"}
              name="confirm"
              id="confirm"
              className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
            />

            {showPasswordIcon}
          </div>
          <p className="mt-2  text-sm text-pink-600">
            {errors?.confirm?.message}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <input
            {...register("aggrement", {
              required:
                "You must need to be agree with our aggrement to be continue ",
              validate: (value) => value === true || "Aggrement is required",
            })}
            type="checkbox"
            name="aggrement"
            id="aggrement"
            className="cursor-pointer rounded-sm text-primary focus:ring-0"
          />
          <label
            htmlFor="aggrement"
            className="ml-3 cursor-pointer text-gray-600"
          >
            I have read and agree to the{" "}
            <a href="#" className="text-primary">
              terms & conditions
            </a>
          </label>
        </div>
        <p className="mt-2  text-sm text-pink-600">
          {errors?.aggrement?.message}
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
          className="block w-full rounded border border-primary bg-primary py-2  text-center font-roboto font-medium uppercase text-white transition hover:bg-transparent hover:text-primary disabled:bg-red-400"
        >
          {isSubmitting ? "Creating account .." : "create account"}
        </button>
      </div>
    </form>
  );
}
