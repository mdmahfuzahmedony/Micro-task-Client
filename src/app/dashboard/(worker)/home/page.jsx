"use client";
import React from 'react';

const WorkerHome = () => {
    // ১. ডামি ডাটা (পরবর্তীতে আপনি ডাটাবেস থেকে এটি আনবেন)
    const workerStats = {
        totalSubmissions: 120,
        pendingSubmissions: 15,
        totalEarnings: 4500 // Coins or Amount
    };

    const approvedSubmissions = [
        { id: 1, task_title: "YouTube Subscribe", payable_amount: 50, buyer_name: "John Doe" },
        { id: 2, task_title: "Facebook Page Like", payable_amount: 30, buyer_name: "Sumaiya Akter" },
        { id: 3, task_title: "App Install & Review", payable_amount: 150, buyer_name: "Tech Solutions" },
        { id: 4, task_title: "Share Blog Post", payable_amount: 25, buyer_name: "Rakib Hasan" },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">

            {/* --- Section 1: Stats Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Submission Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">📊</div>
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase">Total Submission</p>
                        <h2 className="text-2xl font-bold text-slate-800">{workerStats.totalSubmissions}</h2>
                    </div>
                </div>

                {/* Pending Submission Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">⏳</div>
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase">Pending Submission</p>
                        <h2 className="text-2xl font-bold text-slate-800">{workerStats.pendingSubmissions}</h2>
                    </div>
                </div>

                {/* Total Earning Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">💰</div>
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase">Total Earning</p>
                        <h2 className="text-2xl font-bold text-green-600">🪙 {workerStats.totalEarnings}</h2>
                    </div>
                </div>

            </div>

            {/* --- Section 2: Approved Submissions Table --- */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Approved Submissions</h2>
                        <p className="text-xs text-slate-500 mt-1">List of tasks that have been approved by the buyers.</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Approved Only</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                                <th className="p-4 border-b">Task Title</th>
                                <th className="p-4 border-b text-center">Payable Amount</th>
                                <th className="p-4 border-b">Buyer Name</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {approvedSubmissions.length > 0 ? (
                                approvedSubmissions.map((sub) => (
                                    <tr key={sub.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                                        <td className="p-4 font-semibold text-slate-700">
                                            {sub.task_title}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="text-green-600 font-bold">🪙 {sub.payable_amount}</span>
                                        </td>
                                        <td className="p-4 text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center text-[10px] uppercase font-bold text-slate-500">
                                                    {sub.buyer_name.charAt(0)}
                                                </div>
                                                {sub.buyer_name}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-10 text-center text-slate-400">
                                        No approved submissions found yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default WorkerHome;