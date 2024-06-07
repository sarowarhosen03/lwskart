import { getInvoice } from "@/lib/dbQueries/userQuery";
import Link from "next/link";

export default async function page({ searchParams }) {
  const id = searchParams?.id;
  let data = await getInvoice(id);

  return <InvoiceView {...data} />;
}

export function InvoiceView({ isAthorized, order: { id } }) {
  if (!id || !isAthorized) {
    return (
      <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-3 text-center">
        <div className="text-red-500">
          {isAthorized && id
            ? "Order not found"
            : "Your not Authorized to See Access this data"}
        </div>
        <Link
          className="my-3 rounded-e-md bg-primary px-4 py-2 text-center text-white"
          href="/user/invoice"
        >
          Go Back
        </Link>
      </div>
    );
  }

  const url = `/pdf/${id}.pdf`;
  return (
    <div className="flex min-h-screen w-screen flex-col items-center gap-3 text-center">
      <Link
        className="my-3 rounded-e-md bg-primary px-4 py-2 text-center text-white"
        href="/user/invoice"
      >
        Go Back
      </Link>
      <object
        data={url}
        type="application/pdf"
        width="100%"
        height="100%"
        className="h-dvh w-screen px-3"
      >
        <p>
          Alternative{" "}
          <Link href={url} target="_blank">
            to the PDF!
          </Link>
        </p>
      </object>
    </div>
  );
}
