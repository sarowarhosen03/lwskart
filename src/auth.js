import { PrismaAdapter } from "@auth/prisma-adapter";

import pirsmaInstance from "@/db/db";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(pirsmaInstance),
  trustHost: true,
  trustHostedDomain: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
        remember: {
          label: "Remember me",
          type: "checkbox",
          placeholder: "Remember me",
        },
      },
      authorize: async ({ email, password, remember }) => {
        try {
          //check if any requird fields missing
          if (!(email || password)) {
            throw new Error(
              JSON.stringify({ message: "Please provide all required fileds" }),
            );
          }

          const finduser = await pirsmaInstance.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!finduser) {
            throw new Error(
              JSON.stringify({
                message:
                  "No such user found with this email please register first",
              }),
            );
          }
          if (!finduser.emailVerified) {
            throw new Error(
              JSON.stringify({
                message: "Please verify your email first to continue ",
                emailVerification: true,
              }),
            );
          }
          const isAuthenticated = await bcrypt.compare(
            password,
            finduser.password,
          );

          if (!isAuthenticated) {
            throw new Error(JSON.stringify({ message: "Incorrect password" }));
          }

          return {
            ...finduser,
            password: undefined,
            remember: remember,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    // async jwt({ token, user }) {
    //     // If user just signed in or "Remember Me" is enabled, extend the token expiration
    //     // return token;
    //     if (user?.remember === "true") {
    //         token.exp = Date.now() + 30 * 24 * 60 * 60 * 1000
    //     }
    //     return { ...token, ...user }
    // },
    // async session(session, userOrToken) {
    //     if (session?.user?.expiration) {
    //         session.user.expiration = userOrToken?.expiration; // Pass the expiration to the session
    //     }
    //     return session;
    // },
  },
});
