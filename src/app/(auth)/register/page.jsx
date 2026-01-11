import { signIn } from "@/app/auth"; // আপনার auth পাথ অনুযায়ী ঠিক করে নিন
import { handleRegister } from "@/app/_action/handleRegister";
import SweetAlert from "@/components/shared/SweetAlert";
import { Suspense } from "react";

export default function RegisterPage({ searchParams }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">

            {/* SweetAlert পপ-আপ চেক করার জন্য */}
            <Suspense fallback={null}>
                <SweetAlert />
            </Suspense>

            <div className="w-full max-w-lg bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Register</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Earn money or hire workers easily</p>
                </div>

                {/* --- গুগল বাটন (এটি আগের মতোই আছে) --- */}
               
                <form
                    action={async () => {
                        "use server";
                        await signIn("google", { redirectTo: "/" }); // এখানে '/' মানে আপনার হোম পেজ
                    }}
                >
                    <button className="w-full flex items-center justify-center gap-3 ...">
                        <img src="..." alt="Google" />
                        Join with Google
                    </button>
                </form>

                <div className="relative my-8 text-center">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200 dark:border-slate-800"></span></div>
                    <span className="relative bg-white dark:bg-slate-900 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or Register with Email</span>
                </div>

                {/* ইমেইল রেজিস্ট্রেশন ফর্ম */}
                <form action={handleRegister} className="space-y-5">

                    {/* Role Selection - ৩টি কার্ড সিস্টেম */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { id: 'worker', label: 'Worker', icon: '🛠️' },
                            { id: 'buyer', label: 'Buyer', icon: '💼' },
                            { id: 'admin', label: 'Admin', icon: '🛡️' }
                        ].map((role) => (
                            <label key={role.id} className="group relative cursor-pointer">
                                <input type="radio" name="role" value={role.id} className="peer sr-only" required defaultChecked={role.id === 'worker'} />
                                <div className="p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-center transition-all peer-checked:border-indigo-600 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/20">
                                    <span className="text-2xl block mb-1">{role.icon}</span>
                                    <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-400">{role.label}</span>
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <input name="name" type="text" placeholder="Full Name" required className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white font-medium" />
                        <input name="email" type="email" placeholder="Email Address" required className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white font-medium" />
                        <input name="password" type="password" placeholder="Password" required className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white font-medium" />
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95 uppercase tracking-wider">
                        Create Free Account
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500 dark:text-slate-400 font-bold">
                    Already have an account? <a href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">Log in</a>
                </p>
            </div>
        </div>
    );
}