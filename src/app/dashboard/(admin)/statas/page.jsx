"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Users, Coins, CreditCard, CheckCircle, Loader2 } from 'lucide-react';

const AdminHome = () => {
    const [stats, setStats] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const serverUrl = "https://micro-task-server-nine.vercel.app";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const statsRes = await axios.get(`${serverUrl}/admin-stats`);
            const requestsRes = await axios.get(`${serverUrl}/withdraw-requests`);
            setStats(statsRes.data);
            setRequests(requestsRes.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handlePaymentSuccess = async (id) => {
        try {
            const res = await axios.patch(`${serverUrl}/approve-withdrawal/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success!", "Payment approved and coins deducted.", "success");
                fetchData(); // ডাটা রিফ্রেশ
            }
        } catch (error) {
            Swal.fire("Error", "Failed to process payment", "error");
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
            {/* ১. স্ট্যাটাস কার্ডস */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Workers" value={stats?.totalWorker} icon={<Users />} color="bg-blue-500" />
                <StatCard title="Total Buyers" value={stats?.totalBuyer} icon={<Users />} color="bg-purple-500" />
                <StatCard title="Available Coins" value={stats?.totalAvailableCoin} icon={<Coins />} color="bg-amber-500" />
                <StatCard title="Total Payments" value={stats?.totalPayments} icon={<CreditCard />} color="bg-emerald-500" />
            </div>

            {/* ২. উইথড্র রিকোয়েস্ট টেবিল */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="p-6 border-b dark:border-slate-800">
                    <h2 className="text-xl font-black dark:text-white">Pending Withdraw Requests</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="p-4 text-xs font-bold uppercase text-slate-400">Worker Email</th>
                                <th className="p-4 text-xs font-bold uppercase text-slate-400">Amount (Coins)</th>
                                <th className="p-4 text-xs font-bold uppercase text-slate-400 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-slate-800">
                            {requests.map((req) => (
                                <tr key={req._id} className="dark:text-slate-300">
                                    <td className="p-4">{req.worker_email}</td>
                                    <td className="p-4 font-bold text-amber-500">🪙 {req.withdrawal_amount}</td>
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => handlePaymentSuccess(req._id)}
                                            className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition flex items-center gap-2 mx-auto"
                                        >
                                            <CheckCircle size={16} /> Payment Success
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {requests.length === 0 && <p className="p-10 text-center text-slate-400">No pending requests.</p>}
                </div>
            </div>
        </div>
    );
};

// ছোট হেল্পার কার্ড কম্পোনেন্ট
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className={`p-4 rounded-2xl text-white ${color}`}>{icon}</div>
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase">{title}</p>
            <h3 className="text-2xl font-black dark:text-white">{value || 0}</h3>
        </div>
    </div>
);

export default AdminHome;