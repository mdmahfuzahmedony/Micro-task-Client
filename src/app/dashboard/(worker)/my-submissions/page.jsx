"use client";

import React, { useState, useEffect } from 'react'; // useContext বাদ দেওয়া হয়েছে
import axios from 'axios';
import { useSession } from "next-auth/react"; // এটি সেশন পাওয়ার জন্য সঠিক পদ্ধতি
import {
    CheckCircle2, Clock, XCircle, Coins,
    ChevronLeft, ChevronRight, Inbox, Loader2
} from 'lucide-react';

const MySubmissions = () => {
    // NextAuth এর useSession হুক ব্যবহার করে ইউজার ডাটা নেয়া হচ্ছে
    const { data: session, status } = useSession();
    const user = session?.user;

    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // ডাটাবেস থেকে রিয়েল ডাটা ফেচ করা
    useEffect(() => {
        // সেশন লোড হওয়া পর্যন্ত এবং ইউজার ইমেইল না পাওয়া পর্যন্ত অপেক্ষা করবে
        if (status === "authenticated" && user?.email) {
          
            axios.get(`http://localhost:5000/my-submissions/${user.email}`)
                .then(res => {
                    setSubmissions(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching submissions:", err);
                    setLoading(false);
                });
        } else if (status === "unauthenticated") {
            setLoading(false); // ইউজার লগইন না থাকলে লোডিং বন্ধ হবে
        }
    }, [user?.email, status]);

    // Pagination Logic
    const totalPages = Math.ceil(submissions.length / itemsPerPage);
    const currentItems = submissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Status Styling Helper
    const getStatusStyle = (status) => {
        const s = status?.toLowerCase() || 'pending';
        if (s === 'approved') return { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20', icon: <CheckCircle2 size={14} /> };
        if (s === 'pending') return { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20', icon: <Clock size={14} /> };
        return { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20', icon: <XCircle size={14} /> };
    };

    // সেশন লোড হওয়ার সময় একটি লোডার দেখানো ভালো
    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">My Submissions</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring your work progress and earnings.</p>
                </div>
                <div className="px-6 py-3 bg-slate-900 dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-widest">Total Done</span>
                    <span className="text-2xl font-black text-white">{submissions.length}</span>
                </div>
            </div>

            {/* Table / Content Section */}
            <div className="bg-white dark:bg-[#0f172a] rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
                {loading ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-blue-500">
                        <Loader2 className="animate-spin mb-2" size={40} />
                        <p className="font-bold text-sm uppercase tracking-widest text-slate-400">Syncing with server...</p>
                    </div>
                ) : submissions.length > 0 ? (
                    <>
                        <div className="overflow-x-auto flex-grow">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900/50">
                                        <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800">Task Title</th>
                                        <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800">Reward</th>
                                        <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {currentItems.map((sub) => {
                                        const style = getStatusStyle(sub.status);
                                        return (
                                            <tr key={sub._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all">
                                                <td className="p-6">
                                                    <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{sub.task_title}</p>
                                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">ID: {sub._id?.slice(-8)}</p>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-lg">
                                                        <Coins size={18} className="text-amber-500" /> {sub.payable_amount}
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex justify-center">
                                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider border ${style.bg} ${style.text} ${style.border}`}>
                                                            {style.icon} {sub.status}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="p-6 border-t dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-transparent">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    className="p-3 rounded-xl border dark:border-slate-700 disabled:opacity-20 hover:bg-white dark:hover:bg-slate-800 transition-all"
                                >
                                    <ChevronLeft size={20} className="dark:text-white" />
                                </button>
                                <span className="text-xs font-black text-slate-400 uppercase">Page {currentPage} / {totalPages}</span>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    className="p-3 rounded-xl border dark:border-slate-700 disabled:opacity-20 hover:bg-white dark:hover:bg-slate-800 transition-all"
                                >
                                    <ChevronRight size={20} className="dark:text-white" />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center py-20 px-4 text-center">
                        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <Inbox size={48} strokeWidth={1} className="text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No submissions found!</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto text-sm">
                            You havent submitted any tasks yet. Browse the task list and start earning coins today.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MySubmissions;