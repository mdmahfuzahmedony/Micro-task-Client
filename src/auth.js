import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { cookies } from "next/headers" // এটি পরিবর্তন করা হয়েছে (next/headers থেকে আসবে)

export const {
    handlers,
    signIn,
    signOut,
    auth
} = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("https://micro-task-server-nine.vercel.app/login", {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    })
                    const user = await res.json()
                    if (res.ok && user) {
                        return user
                    }
                    return null
                } catch (error) {
                    console.error("Authorize Error:", error);
                    return null;
                }
            }
        })
    ],

    pages: {
        signIn: "/login",
        error: "/login",
    },

    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                // Next.js App Router এ কুকি পাওয়ার সঠিক নিয়ম
                const cookieStore = await cookies();
                const selectedRole = cookieStore.get("user_role")?.value || "worker";

                const userInfo = {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: selectedRole,
                };

                try {
                    await fetch("https://micro-task-server-nine.vercel.app/users", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userInfo),
                    });
                } catch (error) {
                    console.error("Error saving user:", error);
                }
            }
            return true;
        },

        async jwt({ token, user }) {
            if (token?.email) {
                try {
                    const res = await fetch(`https://micro-task-server-nine.vercel.app/users/${token.email}`);
                    if (res.ok) {
                        const dbUser = await res.json();
                        if (dbUser) {
                            token.role = dbUser.role;
                        }
                    }
                } catch (error) {
                    console.error("JWT Error:", error);
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token?.role) {
                session.user.role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})