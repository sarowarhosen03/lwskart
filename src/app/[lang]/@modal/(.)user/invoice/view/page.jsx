"use client";
import GloblaLoader from "@/components/ui/GloblaLoader";
import Modal from "@/components/ui/Modal";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

export default async function page({ searchParams }) {
  const InvoiceView = dynamic(
    () => import(`@/app/[lang]/user/invoice/view/page.jsx`),
    {
      loading: () => <GloblaLoader />,
    },
  );
  const id = searchParams.get("id");
  if (!id) {
    return notFound();
  }
  return (
    <Modal>
      <InvoiceView params={{ id }} />
    </Modal>
  );
}
