"use client";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";


const UserDropdown = ({ user }) => {
  if (!user) {
    return (
      <button 
        onClick={() => document.getElementById('login_modal').showModal()} 
        className="btn btn-primary btn-sm rounded-full text-white px-6"
      >
        Login
      </button>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="avatar online border-2 border-primary rounded-xl">
        <div className="w-10 rounded-xl">
          <img src="https://i.pravatar.cc/150" alt="user" />
        </div>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-52 mt-4 border border-base-300">
        <li><Link href="/dashboard"><LayoutDashboard className="w-4 h-4"/> Dashboard</Link></li>
        <li><Link href="/profile"><User className="w-4 h-4"/> Profile</Link></li>
        <div className="divider my-1"></div>
        <li><button className="text-error"><LogOut className="w-4 h-4"/> Logout</button></li>
      </ul>
    </div>
  );
};

export default UserDropdown;