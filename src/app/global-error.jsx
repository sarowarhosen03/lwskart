"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded bg-white p-8 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-red-500">
          Something went wrong!
        </h2>
        <p className="mb-6 text-gray-700">{error.message}</p>
        <button
          onClick={() => reset()}
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
