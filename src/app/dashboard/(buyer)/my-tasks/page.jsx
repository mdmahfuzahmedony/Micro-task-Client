"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { Trash2, Calendar, Users, CircleDollarSign } from "lucide-react";

const mytask = () => {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // ১. ডাটা ফেচ করা
    useEffect(() => {
        if (session?.user?.email) {
            fetch(`http://localhost:5000/my-tasks/${session?.user?.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setTasks(data);
                    setLoading(false);
                });
        }
    }, [session?.user?.email]);

    // ২. ডিলিট হ্যান্ডলার
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:5000/task/${id}`, {
                        method: "DELETE",
                    });
                    if (res.ok) {
                        setTasks(tasks.filter((task) => task._id !== id));
                        Swal.fire("Deleted!", "Your task has been deleted.", "success");
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete task.", "error");
                }
            }
        });
    };

    if (loading) return <div className="p-10 text-center font-bold">Loading your tasks...</div>;

    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">My Campaigns</h2>
                <p className="text-slate-500 font-medium">Manage and monitor your posted tasks</p>
            </div>

            {tasks.length === 0 ? (
                <div className="bg-white p-20 text-center rounded-3xl shadow-sm border border-dashed border-slate-300">
                    <p className="text-slate-400 font-bold">No tasks found. Create one to see it here!</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-slate-100">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-black">
                            <tr>
                                <th className="p-5">Task Details</th>
                                <th>Required Workers</th>
                                <th>Payable Amount</th>
                                <th>Deadline</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className="text-slate-700 font-medium">
                            {tasks.map((task) => (
                                <tr key={task._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <img src={task.task_image_url} alt="" className="w-12 h-12 rounded-xl object-cover" />
                                            <div>
                                                <p className="font-bold text-slate-900">{task.task_title}</p>
                                                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Total Cost: ${task.total_payable_amount}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-indigo-500" />
                                            <span>{task.required_workers}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <CircleDollarSign className="w-4 h-4 text-emerald-500" />
                                            <span>${task.payable_amount} / worker</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-orange-500" />
                                            <span>{new Date(task.completion_date).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default mytask;