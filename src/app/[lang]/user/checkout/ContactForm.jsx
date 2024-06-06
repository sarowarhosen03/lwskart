import InputField from "@/components/ui/InputField";

export default function ContactForm({
  userInfo,
  register,
  errors,
  setValue,
  dictionary,
}) {
  const { name, email, company } = userInfo;
  const { shippingAddress } = userInfo.address || {};
  const labels = dictionary.labels;

  return (
    <div className="col-span-8 rounded border border-gray-200 p-4">
      <h3 className="mb-4 text-lg font-medium capitalize">
        {dictionary.shipping}{" "}
      </h3>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label={labels.firstName}
            name="firstName"
            register={register}
            validation={{ required: "Name is required" }}
            error={errors.firstName}
            value={name}
          />
          <InputField
            label={labels.lastName}
            name="lastName"
            register={register}
            validation={{}}
            error={errors.lastName}
          />
        </div>
        <InputField
          label={labels.company}
          name="company"
          value={company}
          register={register}
          validation={{}}
          error={errors.company}
          placeholder="optional"
        />
        <InputField
          label={labels.region}
          name="region"
          register={register}
          validation={{ required: true }}
          error={errors.region}
          value={shippingAddress?.country}
        />
        <InputField
          label={labels.streetAddress}
          name="address"
          register={register}
          validation={{ required: true }}
          error={errors.address}
          value={shippingAddress.address}
        />
        <InputField
          label={labels.city}
          name="city"
          value={shippingAddress?.city}
          register={register}
          validation={{ required: true }}
          error={errors.city}
        />
        <InputField
          label={labels.phone}
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
          label={labels.email}
          name="email"
          type="email"
          register={register}
          validation={{ required: true }}
          error={errors.email}
          value={email}
        />
        <InputField
          label={labels.PaymentMethod}
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
