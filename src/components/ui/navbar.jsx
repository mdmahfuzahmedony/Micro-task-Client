"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserDropdown from "@/components/ui/UserDropdown";

const Navbar = () => {
  const { data: session } = useSession(); // status সরিয়ে দিলাম
  const user = session?.user;
  const role = user?.role;

  return (
    <div className="sticky top-0 z-50 py-2 w-full bg-gray-100/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="navbar border max-w-[1600px] px-4 mx-auto shadow-sm border-slate-200 dark:border-white/10 rounded-2xl">
        <div className="navbar-start">
          <Link href="/" className="text-xl font-black text-indigo-600 dark:text-indigo-400">
            MicroTask
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 font-bold text-slate-600 dark:text-slate-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/alltasks">Browse Tasks</Link></li>
            {role === "buyer" && (
              <li><Link href="/create-task">Post a Task</Link></li>
            )}
            <li><Link href="/leaderboard">Leaderboard</Link></li>
          </ul>
        </div>

        <div className="navbar-end gap-3">
          {/* লোডিং স্পিনার বাদ দিয়ে শুধু এই কন্ডিশন রাখুন */}
          {session ? (
            <UserDropdown user={user} />
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;