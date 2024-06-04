import Breadcrumb from "@/components/Breadcrumb";
import { getUserInfo } from "@/lib/dbQueries/userQuery";
import CheckOutSummery from "./CheckOutSummery";

export default async function CheckOutPage() {
  const userInfo = await getUserInfo();
  return (
    <>
      <Breadcrumb />
      <CheckOutSummery userInfo={userInfo} />
    </>
  );
}
