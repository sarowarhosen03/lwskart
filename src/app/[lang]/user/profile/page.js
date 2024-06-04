import { auth } from "@/auth/auth";
import prisma from "@/db/db";
import EditUser from "./EditUser";

export default async function ProfilePage() {
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
  return <EditUser userInfo={userInfo} />;
}
