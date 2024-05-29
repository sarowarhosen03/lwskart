import prisma from "@/db/db";
import { emailVerificationExpire } from "@/utils/constrains";
import { VERIFICATION_TYPE } from "@prisma/client";
import jwt from "jsonwebtoken";
import { sendEmail } from "./sendEmail";

export default async function sendVerificationEmail({ email, userId }) {
  try {
    const expireTime = emailVerificationExpire();
    const token = jwt.sign(
      { type: VERIFICATION_TYPE.EMAIL_VERIFY, email, userId },
      process.env.AUTH_SECRET,
      { expiresIn: Math.floor(new Date(expireTime).getTime() / 1000), },
    );

    await prisma.VerificationToken.create({
      data: {
        identifier: email,
        token,
        expires: expireTime,
        type: VERIFICATION_TYPE.EMAIL_VERIFY,
        userId,
      },
    });
    return sendEmail({
      to: email,
      url: `${process.env.SITE_URL}/verify?email=${email}&token=${token}`,
      from: "noreply@lwskart.com",
    });
  } catch (error) {
    throw new Error(error);
  }
}
