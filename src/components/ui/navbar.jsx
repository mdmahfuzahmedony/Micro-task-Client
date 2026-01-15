"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserDropdown from "@/components/ui/UserDropdown";

const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const role = user?.role; // এখান থেকে রোলটি নিন

  return (
    <div className="sticky top-0 z-50 px-4 py-2">
      <div className="navbar bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl max-w-7xl mx-auto shadow-sm border border-slate-200 dark:border-white/10">
        <div className="navbar-start">
          <Link href="/" className="text-xl font-black text-indigo-600 dark:text-indigo-400 px-4">
            MicroTask
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 font-bold text-slate-600 dark:text-slate-300">
            <li><Link href="/">Home</Link></li>

            {/* রোল অনুযায়ী আলাদা লিঙ্ক */}
            {role === "worker" && (
              <li><Link href="/tasks">Browse Tasks</Link></li>
            )}

            {role === "buyer" && (
              <li><Link href="/create-task">Post a Task</Link></li>
            )}

            <li><Link href="/leaderboard">Leaderboard</Link></li>
          </ul>
        </div>

        <div className="navbar-end gap-3 px-4">
          {status === "loading" ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <UserDropdown user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;