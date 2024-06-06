import "./globals.css";

import Link from "next/link";

export default function notFound() {
  return (
    <section class="flex h-screen items-center bg-gray-50 p-16 dark:bg-gray-700">
      <div class="container flex flex-col items-center ">
        <div class="flex max-w-md flex-col gap-6 text-center">
          <h2 class="text-9xl font-extrabold text-gray-600 dark:text-gray-100">
            <span class="sr-only">Error</span>404
          </h2>
          <p class="text-2xl md:text-3xl dark:text-gray-300">
            Sorry, we {`couldn't`} find this page.
          </p>
          <Link
            href="/"
            class="rounded bg-primary px-8 py-4 text-xl font-semibold text-gray-50 hover:text-gray-200"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
