// components/Navbar.js
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import UserDropdown from "@/components/ui/UserDropdown";
import { auth } from "@/app/auth"; // আপনার auth পাথ অনুযায়ী

const Navbar = async () => {
  // সার্ভার সাইড থেকে ইউজার সেশন আনা হচ্ছে
  const session = await auth();
  const user = session?.user;

  return (
    <div className="sticky top-0 z-50 px-4 py-2">
      <div className="navbar bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl max-w-7xl mx-auto shadow-sm border border-slate-200 dark:border-white/10">
        <div className="navbar-start">
          <Link href="/" className="text-xl font-black text-indigo-600 dark:text-indigo-400 px-4 tracking-tighter">
            MicroTask
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 font-bold text-slate-600 dark:text-slate-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/tasks">Browse Tasks</Link></li>
            <li><Link href="/leaderboard">Leaderboard</Link></li>
          </ul>
        </div>

        <div className="navbar-end gap-3 px-4">
          <ThemeToggle />
          {/* ইউজার ডাটা ড্রপডাউনে পাঠানো হচ্ছে */}
          <UserDropdown user={user} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;