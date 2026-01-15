"use client";
import { menuItems } from "@/constants/manuItems";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Sidebar = () => {
    const { data: session, status } = useSession();

    // ১. সেশন থেকে রোল নেওয়া, না থাকলে ডিফল্ট 'worker'
    const role = session?.user?.role || "worker";

    // ২. রোল অনুযায়ী মেনু ফিল্টার করা
    const currentMenu = menuItems[role] || [];

    // সেশন লোড হওয়ার সময় একটি স্কেলিটন বা লোডিং দেখানো ভালো
    if (status === "loading") {
        return <div className="p-4 text-slate-500 text-xs">Loading navigation...</div>;
    }

    return (
        <nav className="mt-6 flex-1 px-4 space-y-2">
            <div className="px-3 mb-4">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                    Navigation ({role})
                </p>
            </div>

            {currentMenu.length > 0 ? (
                currentMenu.map((item, index) => (
                    <Link
                        key={index}
                        href={item.path}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-600 transition text-slate-300 hover:text-white group"
                    >
                        <span className="text-xl group-hover:scale-110 transition-transform">
                            {item.icon}
                        </span>
                        <span className="text-sm font-medium font-sans">
                            {item.name}
                        </span>
                    </Link>
                ))
            ) : (
                <p className="text-xs text-red-400 px-3">No menu items found for this role.</p>
            )}
        </nav>
    );
};

export default Sidebar;