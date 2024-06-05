import { authConFig } from "@/auth/auth.config";
import prisma, { default as prismaInstance } from "@/db/db";
import { refreshToken } from "@/lib/controler/loginControler";
import { downloadFile } from "@/lib/downloadImage";
import { refreshDiscordToken, refreshGoogleToken } from "@/lib/refreswhTokens";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

const sameProviders = ["google", "discord"];
const isSameProvider = (provider) => sameProviders.includes(provider);
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
  ...authConFig,
  callbacks: {
    async jwt(...arg) {
      const [{ token, user, account, trigger, session }] = arg;
      if (trigger === "update") {
        return { ...token, user: { ...token.user, ...session } };
      }
      if (trigger === "signUp") {
        if (user?.image && user.image.startsWith("https://")) {
          try {
            const filename = await downloadFile(user.image, user.id);
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                image: filename,
              },
            });

            token.image = filename;
          } catch (error) {}
        }
      }
      if (trigger === "signIn") {
        if (user && user?.user?.provider === "credentials") {
          return { ...token, ...user };
        }

        //handle google,discore provider
        if (account && isSameProvider(account.provider)) {
          // Save the access token and refresh token in the JWT on the initial login, as well as the user details
          return {
            access_token: account.access_token,
            expires_at: account.expires_at,
            refresh_token: account.refresh_token,
            user: { ...token, provider: account.provider, id: user.id },
          };
        }
      }
      if (token?.user?.provider === "credentials") {
        if (Date.now() < token.expires_at) return token;
        return refreshToken(token);
      }

      if (isSameProvider(token?.provider)) {
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
        isSameProvider(token?.user?.provider)
      ) {
        session.user = token.user;
        if (!session.user.image) {
          session.user.image = session.user.picture;
        }
        return session;
      }

      return session;
    },
    async signIn({ user }) {
      return user?.error !== "accessDenied";
    },
  },
});
