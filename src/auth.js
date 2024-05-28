import { PrismaAdapter } from "@auth/prisma-adapter";

import prismaInstance from "@/db/db";
import loginControler from "@/lib/controler/loginControler";
import { ACCESS_EXPIRE_TIME, ACCESS_TOKEN_EXPIRE } from "@/utils/constrains";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prismaInstance),
  trustHost: true,
  trustHostedDomain: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "select_account",
          response_type: "code",
        },
      },
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
      authorize: loginControler,
    }),
  ],
  callbacks: {
    async jwt(...arg) {
      const [{ token, user, account }] = arg;
      //handel credentials provider
      if (user && user.user?.provider === "credentials")
        //first time loggedin
        return { ...token, ...user };
      else if (token?.user?.provider === "credentials") {
        try {
          const validet = jwt.verify(
            token.backendTokens.accessToken,
            process.env.AUTH_ACCESS_SECRET,
          );

          if (new Date().getTime() < token.backendTokens.expiresIn && validet) {
            return token;
          } else {
            return await refreshToken(token);
          }
        } catch (error) {
          if (error?.message.includes("jwt expired")) {
            return await jwt.refreshToken(token);
          }
          throw new Error("Invalid token");
        }
      }

      //handel google provider
      if (account && account.provider === "google") {
        // console.log(account.refresh_token);
        // Save the access token and refresh token in the JWT on the initial login, as well as the user details

        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          user: { ...token, provider: account.provider, id: user.id },
        };
      } else if (Date.now() < token.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        if (!token.refresh_token) throw new Error("Missing refresh token");
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token,
            }),
            method: "POST",
          });

          const tokens = await response.json();

          if (!response.ok) {
            throw tokens;
          }

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ token, session }) {
      if (token?.user?.provider === "credentials") {
        session.user = token.user;
        session.access_token = token.backendTokens.accessToken;
        return session;
      } else if (token?.user?.provider === "google") {
        session.user = token.user;
        session.access_token = token.access_token;
      }

      return session;
    },
    async signIn({ user }) {
      return user?.error !== "accessDenied";
    },
  },
});

async function refreshToken(tokens) {
  try {
    const refreshTokenData = jwt.verify(
      tokens?.backendTokens?.refreshToken,
      process.env.AUTH_REFRESH_SECRET,
    );
    const payload = {
      email: refreshTokenData.email,
      userId: refreshTokenData.userId,
    };

    const accessToken = await jwt.sign(
      payload,
      process?.env?.AUTH_ACCESS_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRE,
      },
    );
    return {
      ...tokens,
      backendTokens: {
        ...tokens.backendTokens,
        accessToken,
        expiresIn: new Date().setTime(
          new Date().getTime() + ACCESS_EXPIRE_TIME,
        ),
      },
    };
  } catch (e) {
    throw new Error("Invalid refresh token");
  }
}
