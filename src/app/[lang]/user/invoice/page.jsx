import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import Link from "next/link";

export default async function invoicePage() {
  const session = await auth();
  const orderList = await prisma.Order.findMany({
    where: {
      customerId: session.user.id,
    },
    select: {
      id: true,
      invoice: true,
    },
  });

  return (
    <div className="flex flex-col justify-center gap-2 px-4 text-center">
      {orderList?.map((invoice) => (
        <Link
          href={`/pdf/${invoice.id}.pdf`}
          key={invoice.id}
          className="border-primar2 mx-4  my-4 overflow-hidden  bg-white shadow hover:shadow-lg sm:rounded-lg"
        >
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900 hover:underline">
              Invoice ID: {invoice.id}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Payment Method: {invoice.invoice.payment}
            </p>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Payment Status: {invoice.invoice.paymentStatus}
            </p>
            <p className="mt-1 max-w-2xl text-sm font-bold text-gray-500">
              Total: {invoice.invoice.total.discountPrice}
            </p>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Due Date: {new Date(invoice.invoice.dueDate).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
      {!orderList?.length && (
        <div className="flex min-h-screen flex-col justify-center gap-3">
          <h1>No Invoice Found</h1>
          {/* <LocalLink
            className="mx-auto w-fit rounded-md bg-primary px-3 py-1 text-white"
            href="/shop"
          >
            Shop Now
          </LocalLink> */}
        </div>
      )}
    </div>
  );
}
export const revalidate = 0;
