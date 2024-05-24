const alertVariants = {
  info: {
    textColor: "text-blue-800",
    borderColor: "border-blue-300",
    bgColor: "bg-blue-50",
    darkTextColor: "dark:text-blue-400",
    darkBorderColor: "dark:border-blue-800",
  },
  danger: {
    textColor: "text-red-800",
    borderColor: "border-red-300",
    bgColor: "bg-red-50",
    darkTextColor: "dark:text-red-400",
    darkBorderColor: "dark:border-red-800",
  },
  success: {
    textColor: "text-green-800",
    borderColor: "border-green-300",
    bgColor: "bg-green-50",
    darkTextColor: "dark:text-green-400",
    darkBorderColor: "dark:border-green-800",
  },
  warning: {
    textColor: "text-yellow-800",
    borderColor: "border-yellow-300",
    bgColor: "bg-yellow-50",
    darkTextColor: "dark:text-yellow-300",
    darkBorderColor: "dark:border-yellow-800",
  },
  dark: {
    textColor: "text-gray-800",
    borderColor: "border-gray-300",
    bgColor: "bg-gray-50",
    darkTextColor: "dark:text-gray-300",
    darkBorderColor: "dark:border-gray-600",
  },
};
export default function Alert({ variant = "info", message }) {
  const variantClasses = alertVariants[variant];

  return (
    <div
      className={`mb-4  capitalize flex items-center  p-4 text-sm ${variantClasses.textColor} border ${variantClasses.borderColor} rounded-lg ${variantClasses.bgColor}  ${variantClasses.darkTextColor} ${variantClasses.darkBorderColor}`}
      role="alert"
    >
      <svg
        className="me-3 inline h-4 w-4 flex-shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>

        <p>{message}</p>
      </div>
    </div>
  );
}
