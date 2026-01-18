// src/auth.js
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials" // এটি যোগ করতে হবে


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
        // ইমেইল-পাসওয়ার্ড লগইন চালু করার জন্য এটি অবশ্যই লাগবে
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                // এখানে আপনার ব্যাকএন্ড থেকে ইউজার ভেরিফাই করার কোড লিখুন
                // উদাহরণ হিসেবে:
                const res = await fetch("https://micro-task-server-nine.vercel.applogin", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const user = await res.json()

                if (res.ok && user) {
                    return user // ইউজার পাওয়া গেলে রিটার্ন করুন
                }
                return null // না পাওয়া গেলে বা ভুল হলে null
            }
        })
    ],

    // এটিই আপনাকে ডিফল্ট পেজে যাওয়া থেকে আটকাবে
    pages: {
        signIn: "/login",
        error: "/login",
    },

    callbacks: {
        async signIn({
            user,
            account
        }) {
            if (account.provider === "google") {
                const cookieStore = await cookies();
                const selectedRole = cookieStore.get("user_role") ? .value || "worker";

                const userInfo = {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: selectedRole,
                };

                try {
                    await fetch("https://micro-task-server-nine.vercel.appusers", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userInfo),
                    });
                } catch (error) {
                    console.error("Error saving user:", error);
                }
            }
            return true;
        },

        async jwt({
            token,
            user
        }) {
            if (token ? .email) {
                try {
                    const res = await fetch(`https://micro-task-server-nine.vercel.appusers/${token.email}`);
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

        async session({
            session,
            token
        }) {
            if (token ? .role) {
                session.user.role = token.role;
            }
            return session;
        }
    },
    // সিকিউরিটির জন্য এটি যোগ করা ভালো
    secret: process.env.AUTH_SECRET,
})