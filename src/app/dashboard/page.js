"use client";
import React from 'react';

const DashboardHome = () => {
    // ধরুন এই ডাটাগুলো আপনার ডাটাবেস বা অ্যাথেনটিকেশন থেকে আসছে
    const user = {
        name: "Ariful Islam",
        role: "worker", // এখানে 'worker', 'buyer', অথবা 'admin' দিয়ে টেস্ট করতে পারেন
        totalEarned: 12500,
        tasksCompleted: 85,
        pendingTasks: 12,
        totalSpent: 4500, // For Buyer
        tasksPosted: 5,   // For Buyer
        totalUsers: 1200, // For Admin
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Message */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800 font-sans">
                    Welcome back, {user.name}! 👋
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    You are logged in as a <span className="text-blue-600 font-bold uppercase">{user.role}</span>.
                    Here is your account overview.
                </p>
            </div>

            {/* Stats Cards based on Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* --- Worker Stats --- */}
                {user.role === 'worker' && (
                    <>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Earned</p>
                            <h2 className="text-3xl font-bold text-green-600 mt-2">🪙 {user.totalEarned}</h2>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Tasks Completed</p>
                            <h2 className="text-3xl font-bold text-blue-600 mt-2">{user.tasksCompleted}</h2>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Approval</p>
                            <h2 className="text-3xl font-bold text-orange-500 mt-2">{user.pendingTasks}</h2>
                        </div>
                    </>
                )}

                {/* --- Buyer Stats --- */}
                {user.role === 'buyer' && (
                    <>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Spent</p>
                            <h2 className="text-3xl font-bold text-red-500 mt-2">🪙 {user.totalSpent}</h2>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Tasks Posted</p>
                            <h2 className="text-3xl font-bold text-blue-600 mt-2">{user.tasksPosted}</h2>
                        </div>
                    </>
                )}

                {/* --- Admin Stats --- */}
                {user.role === 'admin' && (
                    <>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Active Users</p>
                            <h2 className="text-3xl font-bold text-purple-600 mt-2">{user.totalUsers}</h2>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Tasks Awaiting Review</p>
                            <h2 className="text-3xl font-bold text-red-600 mt-2">15</h2>
                        </div>
                    </>
                )}
            </div>

            {/* Recent Activity / Visual Chart Area */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[300px] flex items-center justify-center border-dashed">
                <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-lg font-semibold text-slate-700">Recent Activity Chart</h3>
                    <p className="text-slate-400 text-sm">Your earning/spending graph will appear here.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;