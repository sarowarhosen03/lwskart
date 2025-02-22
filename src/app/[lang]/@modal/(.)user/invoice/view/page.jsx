import GloblaLoader from "@/components/ui/GloblaLoader";
import Modal from "@/components/ui/Modal";
import dynamic from "next/dynamic";

export default async function page({ searchParams }) {
  const InvoiceView = dynamic(
    () => import(`@/app/[lang]/user/invoice/view/page.jsx`),
    {
      loading: () => <GloblaLoader />,
    },
  );
  return (
    <Modal>
      <InvoiceView searchParams={searchParams} />
    </Modal>
  );
}
