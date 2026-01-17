"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const WorkerHome = () => {
    const { data: session } = useSession();
    const [stats, setStats] = useState({ totalSubmission: 0, totalPending: 0, totalEarning: 0 });
    const [approvedTasks, setApprovedTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.email) {
            const fetchData = async () => {
                try {
                    // Stats এবং Table ডেটা একসাথে কল করা
                    const [statsRes, tasksRes] = await Promise.all([
                        axios.get(`http://localhost:5000/worker-stats/${session.user.email}`),
                        axios.get(`http://localhost:5000/worker-approved-tasks/${session.user.email}`)
                    ]);
                    setStats(statsRes.data);
                    setApprovedTasks(tasksRes.data);
                } catch (error) {
                    console.error("Error fetching worker data", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [session]);

    if (loading) return <div className="p-10 text-center dark:text-white">Loading Dashboard...</div>;

    return (
        <div className="p-6 space-y-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* --- Stats Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Submission */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-wider">Total Submission</p>
                    <h2 className="text-4xl font-black mt-2 dark:text-white">{stats.totalSubmission}</h2>
                </div>

                {/* Pending Submission */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-wider">Pending Submission</p>
                    <h2 className="text-4xl font-black mt-2 text-orange-500">{stats.totalPending}</h2>
                </div>

                {/* Total Earning */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-wider">Total Earning</p>
                    <h2 className="text-4xl font-black mt-2 text-green-500">💰 {stats.totalEarning}</h2>
                </div>
            </div>

            {/* --- Approved Submissions Table --- */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b dark:border-slate-700">
                    <h3 className="text-xl font-bold dark:text-white">Approved Submissions</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase">
                            <tr>
                                <th className="p-4">Task Title</th>
                                <th className="p-4">Payable Amount</th>
                                <th className="p-4">Buyer Name</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-slate-700">
                            {approvedTasks.length > 0 ? (
                                approvedTasks.map((task) => (
                                    <tr key={task._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="p-4 font-medium dark:text-white">{task.task_title}</td>
                                        <td className="p-4 font-bold text-green-600 dark:text-green-400">{task.payable_amount} Coins</td>
                                        <td className="p-4 dark:text-slate-300">{task.buyer_name}</td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold uppercase">
                                                {task.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-10 text-center text-slate-400 italic">No approved tasks found yet.</td>
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