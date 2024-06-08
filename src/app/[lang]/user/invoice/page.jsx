import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import { getDectionary } from "@/lib/getDictionary";
import Link from "next/link";

export default async function invoicePage({ params: { lang } }) {
  const session = await auth();
  const orderList = await prisma.Order.findMany({
    where: {
      customerId: session?.user?.id,
    },
    select: {
      id: true,
      invoice: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const {
    invoiceId,
    PaymentMethod,
    Total,
    paymentStatus,
    DueDate,
    ViewInvoice,
  } = await getDectionary(lang, "invoice");

  return (
    <div className="flex flex-col justify-center gap-2 px-4 text-center">
      {orderList?.map((invoice) => (
        <div
          key={invoice.id}
          className="mx-4 my-4 overflow-hidden border-primary bg-white shadow hover:shadow-lg sm:rounded-lg"
        >
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900 hover:underline">
              {invoiceId} : {invoice?.id}
              <br />
              {invoiceId?.orderDate}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {PaymentMethod}: {invoice?.invoice?.payment}
            </p>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {paymentStatus}: {invoice?.invoice?.paymentStatus}
            </p>
            <p className="mt-1 max-w-2xl text-sm font-bold text-gray-500">
              {Total}: {invoice.invoice?.total?.discountPrice}
            </p>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {DueDate}:{" "}
              {new Date(invoice?.invoice?.dueDate).toLocaleDateString()}
            </p>
            <div className="mt-4 flex justify-around">
              <button className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-700">
                <Link href={`/user/invoice/view?id=${invoice.id}`}>
                  {ViewInvoice}
                </Link>
                {/* Download Button */}
              </button>
            </div>
          </div>
        </div>
      ))}
      {!orderList?.length && (
        <div className="flex min-h-screen flex-col justify-center gap-3">
          <h1>No Invoice Found</h1>
          <Link
            className="mx-auto w-fit rounded-md bg-primary px-3 py-1 text-white"
            href="/shop"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
}

export const revalidate = 0;
