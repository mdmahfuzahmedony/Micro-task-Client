"use client";
import {
  LayoutDashboard,
  LogOut,
  User,
  Wallet,
  PlusCircle,
  ShieldCheck,
  Settings
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const UserDropdown = ({ user }) => {
  // যদি ইউজার লগইন না থাকে
  if (!user) {
    return (
      <Link
        href="/login"
        className="btn bg-indigo-600 hover:bg-indigo-700 border-none btn-sm rounded-xl text-white px-6 font-bold"
      >
        Login
      </Link>
    );
  }

  // রোল অনুযায়ী আলাদা মেনু আইটেম
  const role = user.role || 'worker'; // ডিফল্ট worker

  return (
    <div className="dropdown dropdown-end">
      {/* ইউজার ইমেজ বা এভাটার */}
      <div tabIndex={0} role="button" className="avatar online border-2 border-indigo-500 rounded-xl cursor-pointer">
        <div className="w-10 rounded-xl">
          <img
            src={user.image || "https://ui-avatars.com/api/?name=" + user.name}
            alt="user profile"
          />
        </div>
      </div>

      <ul tabIndex={0} className="dropdown-content z-[1] menu p-3 shadow-2xl bg-white dark:bg-slate-800 rounded-2xl w-60 mt-4 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200">
        <div className="px-4 py-2 mb-2">
          <p className="text-sm font-black truncate">{user.name}</p>
          <p className="text-[10px] uppercase font-bold py-4 text-indigo-500 tracking-widest">{role}</p>
        </div>

        <div className="divider my-0 opacity-50"></div>

        {/* সব রোলের জন্য কমন ড্যাশবোর্ড */}
        <li><Link href="/dashboard" className="py-3 px-6"><LayoutDashboard className="w-4 h-4" /> Dashboard</Link></li>

        {/* --- Role Specific Links --- */}

        {role === 'worker' && (
          <>
            <li><Link href="/my-tasks" className="py-3"><PlusCircle className="w-4 h-4" /> Submitted Tasks</Link></li>
            <li><Link href="/wallet" className="py-3"><Wallet className="w-4 h-4" /> Withdraw Balance</Link></li>
          </>
        )}

        {role === 'buyer' && (
          <>
            <li><Link href="/create-task" className="py-3 text-indigo-600 font-bold"><PlusCircle className="w-4 h-4" /> Post New Task</Link></li>
            <li><Link href="/my-campaigns" className="py-3"><ShieldCheck className="w-4 h-4" /> My Campaigns</Link></li>
            <li><Link href="/deposit" className="py-3"><Wallet className="w-4 h-4" /> Deposit Funds</Link></li>
          </>
        )}

        {role === 'admin' && (
          <>
            <li><Link href="/admin/verify-tasks" className="py-3 font-bold text-orange-500"><ShieldCheck className="w-4 h-4" /> Verify Tasks</Link></li>
            <li><Link href="/admin/users" className="py-3"><User className="w-4 h-4" /> Manage Users</Link></li>
            <li><Link href="/admin/settings" className="py-3"><Settings className="w-4 h-4" /> System Settings</Link></li>
          </>
        )}

        <div className="divider my-0 opacity-50"></div>

        <li><Link href="/profile" className="py-3"><User className="w-4 h-4" /> Profile Settings</Link></li>

        <li>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-3 font-bold"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;