import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">Product Not Found</h1>
        <p className="mt-4 text-xl text-gray-700">The product was not found</p>
        <Link
          className="mt-4 inline-block text-blue-500 hover:underline"
          href="/"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
