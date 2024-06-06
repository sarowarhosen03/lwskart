import notFound from "@/app/not-found";
import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import Link from "next/link";

export default async function page({ params: { id } }) {
  let order = null;
  try {
    order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      select: {
        customerId: true,
      },
    });
  } catch (error) {
    notFound();
  }

  const session = await auth();
  let isAuthrized = order?.customerId === session?.user?.id;
  if (!order || !isAuthrized) {
    return (
      <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-3 text-center">
        <div className="text-red-500">
          {!isAuthrized
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
          Alternative <a href={url}>to the PDF!</a>
        </p>
      </object>
    </div>
  );
}
