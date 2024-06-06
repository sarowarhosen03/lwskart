import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import { getDectionary } from "@/lib/getDictionary";
import EditUser from "./EditUser";

export default async function ProfilePage({ params: { lang } }) {
  const session = await auth();
  const userInfo = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      phone: true,
      address: true,
      company: true,
    },
  });
  const addressDict = await getDectionary(lang, "address");
  const { profile, personal } = await getDectionary(lang);
  return (
    <EditUser
      userInfo={userInfo}
      profileDict={profile}
      personal={personal}
      addressDict={addressDict}
    />
  );
}
