"use server";
import prisma from "@/db/db";
import { VERIFICATION_TYPE } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendVerificationEmail from "../sendVerificationEmail";

const HASH_SALT = 6;

export async function register(data) {
  if (!(data.email || data.password || data.name))
    return {
      error: true,
      message: "Please fill all the fields",
    };

  try {
    const hashedPassword = await bcrypt.hash(data.password, HASH_SALT);
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
    await sendVerificationEmail({
      email: newUser.email,
      userId: newUser.id,
    });
    return {
      error: false,
      message:
        "user registered successfully please check your email inbox to verify it",
      redirect: "/login",
    };
  } catch (error) {
    if (error?.message.includes("User_email_key")) {
      //alread user exists
      const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
        select: {
          emailVerified: true,
          id: true,
        },
      });

      if (user) {
        return {
          error: true,
          message: "User already exists please try to  login ",
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
    const user = await prisma.user.findFirst({
      where: { email: email }
    }
    );
    if (user.emailVerified) {
      return {
        error: false,
        message: "User already verified"
      }
    }
    if (!user) {
      throw new Error("invalid token");
    }
    try {
      tokenData = jwt.verify(token, process.env.AUTH_SECRET);
    } catch (error) {
      if (error?.message.includes("jwt expired")) {
        //token expired
        const tokenInfo = await prisma.VerificationToken.finFirst({
          where: {
            token,
            identifier: email,
            type: VERIFICATION_TYPE.EMAIL_VERIFY,
          },
          select: {
            userId: true,
          },
        });
        if (!tokenInfo) {
          throw new Error("invalid token");
        }

        await sendVerificationEmail({ email, userId: tokenInfo.userId });
        throw new Error(
          "Token expired wen send a new email to you please check your email inbox to verify your email then login",
        );
      } else {
        throw new Error("invalid token");
      }
    }
    if (tokenData && tokenData.email === email) {
      await prisma.$transaction([
        prisma.verificationToken.delete({
          where: {
            identifier_token: {
              identifier: email,
              token: token
            }
          },
        }),
        prisma.user.update({
          where: {
            email: tokenData.email,
            id: tokenData.userId
          },
          data: {
            emailVerified: new Date()
          },
          select: { id: true },
        }),
      ]);

      return {
        error: false,
        message: "Email verified successfully",
        redirect: "/login",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong",
    };
  }
}
