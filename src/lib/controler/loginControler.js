import prisma from "@/db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ACCESS_EXPIRE_TIME, ACCESS_TOKEN_EXPIRE } from "@/utils/constrains";
import sendVerificationEmail from "@/lib/sendVerificationEmail";

const refreshExpireTime = (remember) => (remember ? 30 : 1);
export default async function loginControler({ email, password, remember }) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        emailVerified: true,
        image: true,
      },
    });
    if (foundUser && !foundUser.emailVerified) {
      await sendVerificationEmail({ email });
      return { error: "accessDenied" };
    }
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      const { password, emailVerified, ...result } = foundUser;
      const payload = { email: result.email, userId: result.id };
      return {
        user: { ...result, provider: "credentials" },
        backendTokens: {
          accessToken: jwt.sign(payload, process.env.AUTH_ACCESS_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRE,
          }),
          refreshToken: jwt.sign(payload, process.env.AUTH_REFRESH_SECRET, {
            expiresIn: refreshExpireTime(remember) + "d",
          }),
          expiresIn: new Date().setTime(
            new Date().getTime() + ACCESS_EXPIRE_TIME,
          ),
        },
      };
    }

    return null;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
}
