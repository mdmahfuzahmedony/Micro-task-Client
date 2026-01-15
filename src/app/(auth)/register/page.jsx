"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
import Swal from "sweetalert2"; // SweetAlert2 সরাসরি ব্যবহার করা ভালো
import { useRouter } from "next/navigation"; // রিডাইরেক্ট করার জন্য
import Link from "next/link";
import { Suspense } from "react";
import SweetAlert from "@/components/shared/SweetAlert";

export default function RegisterPage() {
    const [selectedRole, setSelectedRole] = useState("worker");
    const router = useRouter();

    // ১. গুগল দিয়ে সাইন-ইন ফাংশন
    const handleGoogleSignIn = () => {
        Cookies.set("user_role", selectedRole, { expires: 1, path: "/" });
        setTimeout(() => {
            signIn("google", { callbackUrl: "/" });
        }, 500);
    };

    // ২. ইমেইল দিয়ে রেজিস্ট্রেশন করার ফাংশন
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const userInfo = {
            name,
            email,
            password, // নোট: প্রোডাকশনে পাসওয়ার্ড হ্যাশ করা উচিত
            role: selectedRole,
            balance: 0,
            createdAt: new Date(),
        };

        try {
            const res = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInfo),
            });

            const data = await res.json();

            if (data.upsertedId || data.modifiedCount || data.matchedCount) {
                Swal.fire({
                    title: "Registration Successful!",
                    text: "Your account has been created. Please log in.",
                    icon: "success",
                    confirmButtonColor: "#4f46e5",
                });
                form.reset();
                router.push("/login"); // লগইন পেজে পাঠিয়ে দিবে
            } else {
                Swal.fire("Error", "Registration failed. Try again.", "error");
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire("Error", "Server is not responding.", "error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
            <Suspense fallback={null}>
                <SweetAlert />
            </Suspense>

            <div className="w-full max-w-lg bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase">Register</h1>
                    <p className="text-slate-500 mt-2 font-medium">Earn money or hire workers easily</p>
                </div>

                {/* গুগল বাটন */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 p-4 bg-white dark:bg-slate-800 border border-slate-200 rounded-2xl font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
                    Join with Google
                </button>

                <div className="relative my-8 text-center">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
                    </div>
                    <span className="relative bg-white dark:bg-slate-900 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or Register with Email</span>
                </div>

                {/* ইমেইল রেজিস্ট্রেশন ফর্ম */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Role Selection */}
                    <div className="grid grid-cols-3 gap-4">
                        {['worker', 'buyer', 'admin'].map((role) => (
                            <label key={role} className="group relative cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value={role}
                                    className="peer sr-only"
                                    checked={selectedRole === role}
                                    onChange={() => setSelectedRole(role)}
                                />
                                <div className="p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 text-center transition-all peer-checked:border-indigo-600 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/20">
                                    <span className="text-2xl block mb-1">{role === 'worker' ? '🛠️' : role === 'buyer' ? '💼' : '🛡️'}</span>
                                    <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-400">{role}</span>
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <input name="name" type="text" placeholder="Full Name" required className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none dark:text-white font-medium focus:ring-2 focus:ring-indigo-500" />
                        <input name="email" type="email" placeholder="Email Address" required className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none dark:text-white font-medium focus:ring-2 focus:ring-indigo-500" />
                        <input name="password" type="password" placeholder="Password" required className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none dark:text-white font-medium focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-5 rounded-2xl font-black text-lg transition-all shadow-xl uppercase tracking-wider active:scale-95">
                        Create Free Account
                    </button>
                </form>

                {/* লগইন লিঙ্ক */}
                <p className="mt-8 text-center text-slate-500 dark:text-slate-400 font-bold">
                    Already have an account?
                    <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">Log in</Link>
                </p>
            </div>
        </div>
    );
}