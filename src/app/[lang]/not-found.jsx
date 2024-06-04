import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700">Page not found</p>
        <Link
          href="/"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
