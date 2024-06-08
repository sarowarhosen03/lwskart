import { Controller, useFormContext } from "react-hook-form";
const FormSection = ({
  title,
  section,
  fields,
  isEditing,
  isSameAddress,
  handleSameAddressChange,
  children,
  setValue,
  notSet
}) => {
  const { watch, control } = useFormContext();
  const profile = watch();

  const getValue = (field) => {
    return section === "personal"
      ? profile[field]
      : profile[section] && profile[section][field];
  };

  return (
    <div className="rounded bg-white px-4 pb-8 pt-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <div className="space-y-1">
        {fields.map(({ label, field, type = "text", ...arg }) => (
          <div key={field}>
            <h4 className="font-medium text-gray-700">{label}</h4>
            {isEditing ? (
              <Controller
                control={control}
                name={section === "personal" ? field : `${section}.${field}`}
                render={({ field: { onChange, value } }) => (
                  <input
                    type={type}
                    value={value || ""}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    onChange={(e) => {
                      onChange(e);
                      if (isSameAddress && section === "billingAddress") {
                        setValue(`shippingAddress.${field}`, e.target.value);
                      }
                    }}
                    className="w-full rounded border px-2 py-1 read-only:bg-slate-300"
                    required
                    minLength={field === "phone" ? 11 : 2}
                    {...arg}
                  />
                )}
              />
            ) : (
              <p className="text-gray-800">
                {getValue(field) || notSet}
              </p>
            )}
          </div>
        ))}
        {section === "personal" && children}
        {section === "shippingAddress" && isEditing && (
          <div>
            <h4 className="font-medium text-gray-700">
              Same as Billing Address
            </h4>
            <input
              type="checkbox"
              checked={isSameAddress}
              onChange={handleSameAddressChange}
              className="rounded border px-2 py-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSection;
