import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
const prisma = new PrismaClient()

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    // pages: {
    //     signIn: '/signin'
    // },
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
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Enter your email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter your password',
                },
            },
            authorize: async (credentials) => {

            }

        })
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            // If user just signed in or "Remember Me" is enabled, extend the token expiration
            if (user?.rememberMe) {
                token.expiration = Date.now() + 30 * 24 * 60 * 60 * 1000; // Extend to 30 days, for example
            }
            return token;
        },
        async session(session, userOrToken) {
            session.user.expiration = userOrToken.expiration; // Pass the expiration to the session
            return session;
        },
    },
});
