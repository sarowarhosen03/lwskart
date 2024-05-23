"use server";
import { signIn } from "@/auth";
import prisma from "@/db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthError } from "next-auth";
import sendVerificationEmail from "../sendVerificationEmail";
const HASH_SALT = 6;

export async function loginAction({ email, password, remember }) {
    try {
        const response = await signIn('credentials', {
            email: email,
            password: password,
            remember: !!remember,
            redirect: false
        })
        return response;
    } catch (error) {

        if (error instanceof AuthError) {
            if (error.cause?.err instanceof Error) {
                return {
                    error: true,
                    payload: JSON.parse(error.cause.err.message)
                }; // return "custom error"
            }
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials';
                default:
                    return 'Something went wrong';
            }
        }
        throw error;

    }
}

export async function register(data) {
    if (!(data.email || data.password || data.name))
        return {
            error: true,
            message: "Please fill all the fields",
        };

    try {
        const hashedPassword = await bcrypt.hash(data.password, HASH_SALT);
        prisma.user
            .create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                },
            })
            .then(async ({ email, name }) => {
                await sendVerificationEmail({ email });
            })
            .catch(async (err) => {
                //check if and user already exists
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
            });

        return {
            error: false,
            message:
                "user successfully registered please check your email inbox to verify your email then login",
            // redirect: "/login"
        };
    } catch (error) {

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
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new Error("User not found");
            }

            await prisma.$transaction([
                prisma.verificationToken.deleteMany({
                    where: { token: tokenData.token },
                }),
                prisma.user.updateMany({
                    where: { email },
                    data: { emailVerified: new Date() },
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
            message: error.message || "Something went wrong",
        };
    }
}
