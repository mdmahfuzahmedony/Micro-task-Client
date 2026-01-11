import { signIn } from "@/app/auth";

export default function LoginPage({ searchParams }) {
    const error = searchParams?.error;
    const success = searchParams?.success;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-[2rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800">

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight text-center">Welcome Back</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Sign in to your dashboard</p>
                </div>

                <form
                    action={async () => {
                        "use server";
                        await signIn("google", { redirectTo: "/" }); // এখানে '/' মানে আপনার হোম পেজ
                    }}
                >
                    <button className="w-full flex items-center justify-center gap-3 ...">
                        <img src="..." alt="Google" />
                        Login with Google
                    </button>
                </form>

                <div className="relative my-10 text-center">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200 dark:border-slate-800"></span></div>
                    <span className="relative bg-white dark:bg-slate-900 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or Email Login</span>
                </div>

                {error && <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl text-center font-medium">{error}</div>}
                {success && <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm rounded-xl text-center font-medium">{success}</div>}

                <form action={async (formData) => {
                    "use server"
                    await signIn("credentials", formData)
                }} className="space-y-5">
                    <input name="email" type="email" placeholder="Email Address" required className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all" />
                    <input name="password" type="password" placeholder="Password" required className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all" />

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-[0.98]">
                        Log In
                    </button>
                </form>

                <p className="mt-10 text-center text-slate-600 dark:text-slate-400 font-medium">
                    Don't have an account? <a href="/register" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline ml-1">Sign up</a>
                </p>
            </div>
        </div>
    );
}