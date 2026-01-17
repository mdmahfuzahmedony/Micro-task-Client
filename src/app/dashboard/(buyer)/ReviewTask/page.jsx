"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";

const ReviewTask = () => {
    const { data: session } = useSession();
    const [submissions, setSubmissions] = useState([]);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    // ডেটা লোড করা
    useEffect(() => {
        if (session?.user?.email) {
            fetchSubmissions();
        }
    }, [session]);

    const fetchSubmissions = async () => {
        const res = await axios.get(`http://localhost:5000/pending-submissions/${session.user.email}`);
        setSubmissions(res.data);
    };

    // Approve Handler
    const handleApprove = async (id, worker_email, amount) => {
        const res = await axios.patch(`http://localhost:5000/approve-submission/${id}`, {
            worker_email,
            amount
        });
        if (res.data.modifiedCount > 0) {
            Swal.fire("Approved!", "Worker has been paid.", "success");
            fetchSubmissions(); // Refresh table
        }
    };

    // Reject Handler
    const handleReject = async (id, task_id) => {
        const res = await axios.patch(`http://localhost:5000/reject-submission/${id}`, { task_id });
        if (res.data.success) {
            Swal.fire("Rejected", "Submission rejected and worker slot increased.", "info");
            fetchSubmissions(); // Refresh table
        }
    };

    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white uppercase">Task To Review</h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left bg-white dark:bg-slate-800">
                    <thead className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase text-xs">
                        <tr>
                            <th className="p-4">Worker Name</th>
                            <th className="p-4">Task Title</th>
                            <th className="p-4">Payable Amount</th>
                            <th className="p-4">View Detail</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {submissions.map((sub) => (
                            <tr key={sub._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <td className="p-4 font-medium dark:text-white">{sub.worker_name}</td>
                                <td className="p-4 dark:text-slate-300">{sub.task_title}</td>
                                <td className="p-4 font-bold text-green-600 dark:text-green-400">{sub.payable_amount} Coins</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => setSelectedSubmission(sub)}
                                        className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                                    >
                                        View Submission
                                    </button>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => handleApprove(sub._id, sub.worker_email, sub.payable_amount)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-bold transition-all"
                                    > Approve </button>
                                    <button
                                        onClick={() => handleReject(sub._id, sub.task_id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-bold transition-all"
                                    > Reject </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Detail Modal */}
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl max-w-lg w-full shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 dark:text-white">Submission Details</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">{selectedSubmission.submission_details}</p>
                        <button
                            onClick={() => setSelectedSubmission(null)}
                            className="w-full bg-slate-200 dark:bg-slate-700 py-2 rounded-xl font-bold dark:text-white"
                        > Close </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewTask;