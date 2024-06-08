import Breadcrumb from "@/components/Breadcrumb";
import { getUserInfo } from "@/lib/dbQueries/userQuery";
import { getDectionary } from "@/lib/getDictionary";
import CheckOutSummery from "./CheckOutSummery";

export default async function CheckOutPage({ params: { lang } }) {
  const userInfo = await getUserInfo();
  const dictionary = await getDectionary(lang, "checkout");
  return (
    <>
      <Breadcrumb />
      <CheckOutSummery
        userInfo={userInfo}
        lang={lang}
        dictionary={dictionary}
      />
    </>
  );
}
export const revalidate = 0;
