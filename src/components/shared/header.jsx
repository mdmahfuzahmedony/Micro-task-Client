"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { LuBell, LuCoins } from "react-icons/lu";

const Header = () => {
  const { data: session, status } = useSession();
  const [dbUser, setDbUser] = useState(null);

  // ডাটাবেস থেকে ইউজারের লেটেস্ট ব্যালেন্স নিয়ে আসা
  useEffect(() => {
    if (session?.user?.email) {
      const fetchUserData = async () => {
        try {
          const res = await axios.get(
            `https://micro-task-server-nine.vercel.app/users/${session.user.email}`
          );
          setDbUser(res.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
      // প্রতি ১০ সেকেন্ড পরপর অটো-আপডেট হবে (অপশনাল)
      const interval = setInterval(fetchUserData, 10000);
      return () => clearInterval(interval);
    }
  }, [session?.user?.email]);

  if (status === "loading") {
    return (
      <div className="h-20 bg-white dark:bg-slate-900 border-b dark:border-slate-800 animate-pulse"></div>
    );
  }

  if (!session) return null;

  // ডাটাবেসের ব্যালেন্স না পাওয়া গেলে সেশনের ব্যালেন্স ব্যবহার করবে
  const currentBalance = dbUser ? dbUser.balance : session.user.balance || 0;
  const currentRole = dbUser ? dbUser.role : session.user.role || "worker";

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-40 transition-colors">
      <div className="flex items-center gap-6">
        {/* Available Coins Section */}
        <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-500/10 px-4 py-2 rounded-2xl border border-amber-200 dark:border-amber-500/20 shadow-sm">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-md">
            <LuCoins size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-500 tracking-wider leading-none">
              Coins
            </span>
            <span className="text-lg font-black text-slate-800 dark:text-white leading-none">
              {currentBalance}
            </span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

        {/* User Info Section */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={
                session.user.image ||
                `https://ui-avatars.com/api/?name=${session.user.name}`
              }
              className="w-11 h-11 rounded-2xl border-2 border-indigo-500 p-0.5 object-cover"
              alt="profile"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-tighter">
              {currentRole}
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
              {session.user.name}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-3">
        <button className="relative p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 group">
          <LuBell size={22} className="group-hover:rotate-12" />
          <span className="absolute top-2 right-2 bg-red-500 border-2 border-white dark:border-slate-900 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
            3
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
