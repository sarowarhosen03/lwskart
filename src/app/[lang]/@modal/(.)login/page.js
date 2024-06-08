import GloblaLoader from "@/components/ui/GloblaLoader";
import Modal from "@/components/ui/Modal";
import { getDectionary } from "@/lib/getDictionary";
import dynamic from "next/dynamic";

export default async function page({ params: { lang } }) {
  const dict = await getDectionary(lang);
  const LogiPage = dynamic(() => import(`@/components/auth/Login.jsx`), {
    loading: () => <GloblaLoader />,
  });
  return (
    <Modal>
      <LogiPage dict={dict} />
    </Modal>
  );
}
