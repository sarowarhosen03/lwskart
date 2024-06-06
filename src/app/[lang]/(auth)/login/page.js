import Login from "@/components/auth/Login";
import { getDectionary } from "@/lib/getDictionary";

export default async function loginPage({ params: { lang } }) {
  const dict = await getDectionary(lang);
  return <Login dict={dict} />;
}
