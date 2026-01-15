"use client";
import React from 'react';

const MySubmissions = () => {
    // ডামি ডাটা (পরবর্তীতে API দিয়ে workerEmail ফিল্টার করে আনবেন)
    const submissions = [
        { id: 1, task_title: "YouTube Subscribe", payable_amount: 50, workerEmail: "user@example.com", status: "approved" },
        { id: 2, task_title: "Facebook Page Like", payable_amount: 30, workerEmail: "user@example.com", status: "pending" },
        { id: 3, task_title: "App Install", payable_amount: 200, workerEmail: "user@example.com", status: "rejected" },
        { id: 4, task_title: "Review on PlayStore", payable_amount: 100, workerEmail: "user@example.com", status: "approved" },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-700">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800 font-sans">My Submissions</h2>
                <p className="text-sm text-slate-500 font-sans">Track all your submitted tasks and their status.</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans">
                    <thead>
                        <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                            <th className="p-4 border-b">Task Title</th>
                            <th className="p-4 border-b">Payable Amount</th>
                            <th className="p-4 border-b">Submission Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-slate-700">
                        {submissions.map((sub) => (
                            <tr key={sub.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-medium">{sub.task_title}</td>
                                <td className="p-4 font-bold text-slate-900">🪙 {sub.payable_amount}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border ${sub.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200' :
                                            sub.status === 'pending' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                                'bg-red-100 text-red-700 border-red-200'
                                        }`}>
                                        {sub.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySubmissions;