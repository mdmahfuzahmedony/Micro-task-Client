"use client";
import React from 'react';
import Link from 'next/link';

const TaskList = () => {
    // ডাটাবেস থেকে আসা ডামি ডাটা (Mock Data)
    const allTasks = [
        {
            id: "101",
            task_title: "Watch YouTube Video for 2 Mins",
            buyer_name: "John Doe",
            completion_date: "2023-12-30",
            payable_amount: 50,
            required_workers: 15
        },
        {
            id: "102",
            task_title: "Facebook Page Like & Share",
            buyer_name: "Sumaiya Khan",
            completion_date: "2023-11-25",
            payable_amount: 30,
            required_workers: 0, // এটি দেখাবে না কারণ worker 0
        },
        {
            id: "103",
            task_title: "Install and Review 'SafeApp'",
            buyer_name: "Tech Pro Ltd",
            completion_date: "2023-11-20",
            payable_amount: 200,
            required_workers: 5
        },
        {
            id: "104",
            task_title: "Join Telegram Group",
            buyer_name: "Crypto Hub",
            completion_date: "2023-12-05",
            payable_amount: 20,
            required_workers: 100
        }
    ];

    // ফিল্টার: শুধুমাত্র যাদের required_worker > 0 তাদের দেখাবে
    const availableTasks = allTasks.filter(task => task.required_workers > 0);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Available Tasks</h1>
                    <p className="text-sm text-slate-500 font-sans">Find and complete tasks to earn coins instantly.</p>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                    <span className="text-blue-600 font-bold">{availableTasks.length}</span>
                    <span className="text-blue-600 text-sm ml-1 font-sans">Tasks Found</span>
                </div>
            </div>

            {/* Task Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableTasks.length > 0 ? (
                    availableTasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
                        >
                            {/* Task Title */}
                            <h3 className="text-lg font-bold text-slate-800 line-clamp-2 min-h-[56px] group-hover:text-blue-600 transition-colors">
                                {task.task_title}
                            </h3>

                            {/* Task Info List */}
                            <div className="mt-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-sans">Buyer:</span>
                                    <span className="text-slate-800 font-semibold">{task.buyer_name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-sans">Deadline:</span>
                                    <span className="text-slate-800 font-medium">{task.completion_date}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-sans">Required Workers:</span>
                                    <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">
                                        {task.required_workers} Left
                                    </span>
                                </div>
                            </div>

                            {/* Bottom Section: Amount & Action */}
                            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Payable</p>
                                    <p className="text-xl font-black text-green-600">🪙 {task.payable_amount}</p>
                                </div>

                                {/* View Details Button */}
                                <Link href={`/dashboard/task-list/${task.id}`}>
                                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 font-sans">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <span className="text-4xl">🔍</span>
                        <h3 className="text-lg font-bold text-slate-600 mt-4 font-sans">No tasks available right now.</h3>
                        <p className="text-slate-400 text-sm font-sans">Please check back later for new opportunities.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskList;