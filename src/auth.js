import { PrismaAdapter } from "@auth/prisma-adapter";

import prismaInstance from "@/db/db";
import loginControler, { refreshToken } from "@/lib/controler/loginControler";
import {
  refreshDiscordToken,
  refreshGoogleToken,
} from "@/lib/refreswhTokens";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscorProvider from "next-auth/providers/discord";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
const sameProviders = ["google", "discord"];
const isSameProvder = (provider) => sameProviders.includes(provider);

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
    DiscorProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "none",
        },
      },
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

      if (user && user?.user?.provider === "credentials") {
        return { ...token, ...user };
      }
      else if (token?.user?.provider === "credentials") {
        if (Date.now() < token.expires_at) return token
        return refreshToken(token)

      }

      //handel google,discore provider
      if (account && isSameProvder(account.provider)) {
        // Save the access token and refresh token in the JWT on the initial login, as well as the user details
        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          user: { ...token, provider: account.provider, id: user.id },
        };
      }

      if (isSameProvder(token?.provider)) {
        if (Date.now() < token.expires_at * 1000) {
          // If the access token has not expired yet, return it
          return token;
        } else {
          if (!token.refresh_token) throw new Error("Missing refresh token");
          // If the access token has expired, try to refresh it
          try {
            let tokens;
            if (token.user.provider === "google") {
              tokens = await refreshGoogleToken(token.refresh_token);
            } else if (token.user.provider === "discord") {
              tokens = await refreshDiscordToken(token.refresh_token);
            }
            // We need the `token_endpoint`.
            return {
              ...token, // Keep the previous token properties
              access_token: tokens.access_token,
              expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
              refresh_token: tokens.refresh_token ?? token.refresh_token,
            };
          } catch (error) {
            // The error property will be used client-side to handle the refresh token error
            return { ...token, error: "RefreshAccessTokenError" };
          }
        }
      }

      return token;
    },
    async session({ token, session }) {
      if (
        token?.user?.provider === "credentials" ||
        isSameProvder(token?.user?.provider)
      ) {
        session.toke = token.access_token
        session.user = token.user;
        // session.access_token = token.backendTokens.accessToken;
        return session;
      }

      return session;
    },
    async signIn({ user }) {
      return user?.error !== "accessDenied";
    },
  },
});
