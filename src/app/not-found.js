import HuhMan from "@/components/ui/HuhMan";
import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <HuhMan />

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </h1>

          <p className="mt-4 text-gray-500">We {`can't`} find that page.</p>
        </div>

        <Link
          href="/"
          className="mt-4 rounded bg-primary px-3 py-2 text-center text-xl font-semibold text-gray-50 hover:text-gray-200"
        >
          Back to home
        </Link>
      </div>
    </>
  );
}
