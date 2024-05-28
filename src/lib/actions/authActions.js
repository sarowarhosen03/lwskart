"use server";
import prisma from "@/db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendVerificationEmail from "../sendVerificationEmail";
import { VERIFY_EMAIL } from "@/utils/constrains";

const HASH_SALT = 6;

export async function register(data) {
  if (!(data.email || data.password || data.name))
    return {
      error: true,
      message: "Please fill all the fields",
    };

  try {
    const hashedPassword = await bcrypt.hash(data.password, HASH_SALT);
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
    return {
      error: false,
      message:
        "user registered successfully please check your email inbox to verify it",
      redirect: "/login",
    };
  } catch (error) {
    if (error?.message.includes("User_email_key")) {
      const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (user && user.email === data.email) {
        return {
          error: true,
          message: "User already exists please login ",
          redirect: "/login",
        };
      }
    }

    return {
      error: true,
      message: "Something went wrong while registering user",
    };
  }
}

export async function verifyEmail({ token, email }) {
  try {
    let tokenData;
    try {
      tokenData = jwt.verify(token, process.env.AUTH_SECRET);
    } catch (error) {
      if (error?.message.includes("jwt expired")) {
        //token expired
        await sendVerificationEmail({ email });
        throw new Error(
          "Token expired wen send a new email to you please check your email inbox to verify your email then login",
        );
      } else {
        throw new Error("invalid token");
      }
    }

    if (tokenData && tokenData.email === email) {
      const user = await prisma.VerificationToken.findUnique({
        where: {
          identifier: email,
          type: VERIFY_EMAIL,
        },
      });

      if (!user) {
        throw new Error("invalid token");
      }

      await prisma.$transaction([
        prisma.verificationToken.deleteMany({
          where: { identifier: tokenData.email, type: VERIFY_EMAIL },
        }),
        prisma.user.updateMany({
          where: { email, type: VERIFY_EMAIL },
          data: { emailVerified: new Date() },
          select: { id: true },
        }),
        prisma.Account.create({
          data: {
            userId: user.id,
            provider: "credentials",
            type: VERIFY_EMAIL,
          },
        }),
      ]);

      return {
        error: false,
        message: "Email verified successfully",
        redirect: "/login",
      };
    }

    throw new Error("invalid token");
  } catch (error) {
    return {
      error: true,
      message: error?.message || "Something went wrong",
    };
  }
}
