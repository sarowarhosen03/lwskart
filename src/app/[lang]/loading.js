export default function loading() {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center bg-transparent">
      <svg
        className="h-32 w-32 animate-pulse text-gray-900"
        viewBox="0 0 50 50"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
      </svg>
      <div className="mt-4 text-gray-900">Loading...</div>
    </div>
  );
}
