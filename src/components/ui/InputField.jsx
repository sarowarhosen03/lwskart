export default function InputField({
  label,
  name,
  type = "text",
  register,
  validation,
  error,
  value,
  onChange,
  showPasswordIcon,
  ...props
}) {
  return (
    <div>
      <label htmlFor={name} className="text-gray-600">
        {label}{" "}
        {validation?.required && <span className="text-primary">*</span>}
      </label>
      <div className="relative flex items-center">
        <input
          {...register(name, validation)}
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="input-box peer block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:border-primary focus:ring-0"
          {...props}
        />
        {showPasswordIcon && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer">
            {showPasswordIcon}
          </span>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-pink-600">{error.message}</p>}
    </div>
  );
}
