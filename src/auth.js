// src/auth.js
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                const cookieStore = await cookies();
                const selectedRole = cookieStore.get("user_role")?.value || "worker";

                const userInfo = {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: selectedRole,
                };

                try {
                    await fetch("http://localhost:5000/users", {
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

        // --- এই দুটি কলব্যাক না থাকলে Navbar এ রোল পরিবর্তন হবে না ---

        async jwt({ token, user }) {
            // যখন ইউজার লগইন থাকবে, আমরা ডাটাবেজ থেকে তার ডাটা নিয়ে আসবো
            if (token?.email) {
                try {
                    // আপনার সার্ভার থেকে রোলটি নিয়ে আসা
                    const res = await fetch(`http://localhost:5000/users/${token.email}`);
                    const dbUser = await res.json();

                    if (dbUser) {
                        token.role = dbUser.role; // ডাটাবেজের রোল টোকেনে সেট করলাম
                    }
                } catch (error) {
                    console.error("JWT Error:", error);
                }
            }
            return token;
        },

        async session({ session, token }) {
            // টোকেন থেকে রোলটি নিয়ে সেশনে পাঠানো
            if (token?.role) {
                session.user.role = token.role;
            }
            return session;
        }
    },
})