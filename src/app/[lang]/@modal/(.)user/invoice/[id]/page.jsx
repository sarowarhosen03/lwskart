import GloblaLoader from "@/components/ui/GloblaLoader";
import Modal from "@/components/ui/Modal";
import dynamic from "next/dynamic";

export default async function page({ params: { id } }) {
  const InvoiceView = dynamic(
    () => import(`@/app/[lang]/user/invoice/[id]/page.jsx`),
    {
      loading: () => <GloblaLoader />,
    },
  );
  return (
    <Modal>
      <InvoiceView params={{ id }} />
    </Modal>
  );
}
