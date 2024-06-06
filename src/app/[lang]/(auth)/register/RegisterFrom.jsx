"use client";

import Alert from "@/components/ui/Alert";
import InputField from "@/components/ui/InputField";
import useShowHidePassword from "@/hooks/useShowHidePassword";
import { register as userRegister } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RegisterForm({ dict: { register: registerDict } }) {
  const {
    register,
    formState: { errors, isSubmitting },
    getValues,
    setError,
    clearErrors,
    setValue,
    handleSubmit,
  } = useForm();

  const router = useRouter();
  const [showPasswordIcon, showPassword] = useShowHidePassword();

  const handleRegister = async (formData) => {
    try {
      const response = await userRegister(formData);
      if (!response.error) {
        setError("formStatus", {
          type: "success",
          message: registerDict.createSuccess,
        });
        setTimeout(() => {
          // router.push("/login");
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
          label={registerDict.nameLabel}
          name="name"
          type="text"
          register={register}
          validation={{
            required: registerDict.nameError,
            minLength: {
              value: 5,
              message: registerDict.nameError5,
            },
            maxLength: {
              value: 30,
              message: registerDict.nameError30,
            },
          }}
          error={errors.name}
          placeholder={registerDict.nameLabel}
        />
        <InputField
          label={registerDict.emailLabel}
          name="email"
          type="email"
          register={register}
          validation={{
            required: registerDict.emailError,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: registerDict.emailError3,
            },
            onBlur: (e) =>
              setValue("email", e.target.value.toLowerCase().trim()),
          }}
          error={errors.email}
          placeholder="youremail@domain.com"
          autoComplete="email"
        />
        <InputField
          label={registerDict.passwordLabel}
          name="password"
          type={showPassword ? "text" : "password"}
          register={register}
          validation={{
            required: registerDict.passwordError,
            minLength: {
              value: 8,
              message: registerDict.password8Error,
            },
            maxLength: {
              value: 32,
              message: registerDict.password32Error,
            },
            validate: (value) =>
              value === getValues()?.confirm ||
              registerDict.confirmNotMatchError,
          }}
          error={errors.password}
          placeholder={showPassword ? registerDict.passwordLabel : "*******"}
          showPasswordIcon={showPasswordIcon}
          autoComplete="new-password"
        />
        <InputField
          label={registerDict.confirmLabel}
          name="confirm"
          type={showPassword ? "text" : "password"}
          register={register}
          validation={{
            required: registerDict.confirmError,
            validate: (value) =>
              value === getValues()?.password ||
              registerDict.confirmNotMatchError,
          }}
          error={errors.confirm}
          placeholder={showPassword ? registerDict.confirmLabel : "*******"}
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
            {registerDict.agreementMessage}{" "}
            <a href="#" className="text-primary">
              {registerDict.terms}
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
          {isSubmitting
            ? registerDict.createLoading + "..."
            : registerDict.account}
        </button>
      </div>
    </form>
  );
}
