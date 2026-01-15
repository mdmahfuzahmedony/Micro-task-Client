"use client";
import { useSession } from "next-auth/react";

const Header = () => {
    const { data: session, status } = useSession();
    const user = session?.user;

    // সেশন লোড হওয়ার সময় একটি সিম্পল লোডিং স্টেট
    if (status === "loading") {
        return <div className="h-20 bg-white border-b flex items-center px-8">Loading...</div>;
    }

    // যদি ইউজার লগইন না থাকে
    if (!user) return null;

    return (
        <header className="h-20 bg-white border-b flex items-center justify-between px-8 shadow-sm">
            <div className="flex items-center gap-6">
                {/* Coins & User Info */}
                <div className="flex flex-col border-r pr-6">
                    <span className="text-sm text-gray-500 font-medium font-sans">Available Coins</span>
                    {/* ডাটাবেজে 'balance' থাকলে এখানে balance ই লিখতে হবে */}
                    <span className="text-lg font-bold text-yellow-600">🪙 {user.balance || 0}</span>
                </div>

                <div className="flex items-center gap-3">
                    <img
                        src={user.image || "https://ui-avatars.com/api/?name=" + user.name}
                        className="w-10 h-10 rounded-full border"
                        alt="profile"
                    />
                    <div className="flex flex-col leading-none">
                        {/* সেশনে রোল থাকলে এখানে দেখাবে */}
                        <span className="text-xs font-bold uppercase text-blue-600">
                            {user.role || "worker"}
                        </span>
                        <span className="text-sm font-semibold text-gray-800">{user.name}</span>
                    </div>
                </div>
            </div>

            {/* Notification Icon */}
            <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition">
                <span className="text-2xl">🔔</span>
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </div>
        </header>
    );
};

export default Header;