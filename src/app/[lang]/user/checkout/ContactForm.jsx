import InputField from "@/components/ui/InputField";

export default function ContactForm({
  userInfo,
  register,
  handleSubmit,
  clearErrors,
  errors,
  setValue,
  handleLogin,
}) {
  const { name, email, company } = userInfo;
  const { shippingAddress } = userInfo.address || {};
  return (
    <div className="col-span-8 rounded border border-gray-200 p-4">
      <h3 className="mb-4 text-lg font-medium capitalize">Shipiing Details </h3>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            register={register}
            validation={{ required: "Name is required" }}
            error={errors.firstName}
            value={name}
          />
          <InputField
            label="Last Name"
            name="lastName"
            register={register}
            validation={{}}
            error={errors.lastName}
          />
        </div>
        <InputField
          label="Company"
          name="company"
          value={company}
          register={register}
          validation={{}}
          error={errors.company}
          placeholder="optional"
        />
        <InputField
          label="Country/Region"
          name="region"
          register={register}
          validation={{ required: true }}
          error={errors.region}
          value={shippingAddress?.country}
        />
        <InputField
          label="Street address"
          name="address"
          register={register}
          validation={{ required: true }}
          error={errors.address}
          value={shippingAddress.address}
        />
        <InputField
          label="City"
          name="city"
          value={shippingAddress?.city}
          register={register}
          validation={{ required: true }}
          error={errors.city}
        />
        <InputField
          label="Phone number"
          name="phone"
          register={register}
          value={shippingAddress?.phone}
          validation={{
            required: true,
            minLength: {
              value: 10,
              message: "Phone number should be at least 10 digits",
            },
            onChange: (e) => setValue("phone", Number(e.target.value)),
          }}
          error={errors.phone}
        />
        <InputField
          label="Email address"
          name="email"
          type="email"
          register={register}
          validation={{ required: true }}
          error={errors.email}
          value={email}
        />
             <InputField
          label="Payment Method"
          name="paymentMethod"
          type="text"
          register={register}
          validation={{ required: true }}
          error={errors.email}
          value={"cash on delivery "}
          readOnly={true}
        />
      </div>
    </div>
  );
}
