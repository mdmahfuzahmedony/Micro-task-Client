import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import UserMenu from "@/components/ui/UserDropdown";

const Navbar = () => {
  // এখানে আপনি চাইলে সরাসরি DB থেকে ডাটা আনতে পারেন (Server Side)
  const user = { loggedIn: false }; // আপাতত হার্ডকোডেড

  return (
    <div className="sticky top-0 z-50 px-4 py-2">
      <div className="navbar bg-base-white dark:bg-base-100/80 backdrop-blur-md rounded-2xl max-w-7xl mx-auto shadow-sm border border-slate-200 dark:border-white/10">
        <div className="navbar-start">
          <h1 className="text-xl font-black text-primary px-4 ">MicroTask</h1>
       
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 font-bold opacity-70">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/tasks">Browse Tasks</Link></li>
            <li><Link href="/leaderboard">Leaderboard</Link></li>
          </ul>
        </div>
        <div className="navbar-end gap-2 px-4">
          <ThemeToggle />
          <UserMenu user={user.loggedIn ? user : null} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;