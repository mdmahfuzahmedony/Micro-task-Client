"use client";
import React, { useState } from 'react';

const TaskDetails = ({ params }) => {
    const [submissionText, setSubmissionText] = useState("");

    // ডামি ডাটা (পরবর্তীতে আপনি params.id দিয়ে ডাটাবেস থেকে টাস্কটি আনবেন)
    const task = {
        id: params.id,
        title: "Watch YouTube Video & Subscribe",
        buyer_name: "John Doe",
        payable_amount: 50,
        required_workers: 15,
        completion_date: "2023-12-30",
        description: "Go to YouTube and search for 'How to learn React'. Click on the video with the blue thumbnail. Watch at least 2 minutes of the video, like it, and subscribe to the channel. Do not unsubscribe later, or your coins will be deducted.",
        submission_info: "Submit your YouTube channel name and a screenshot of the subscribed channel."
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 font-sans pb-10">

            {/* 1. Header Section */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <span className="bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Task Details</span>
                    <h1 className="text-3xl font-black text-slate-800 mt-3">{task.title}</h1>
                    <p className="text-slate-500 mt-1 font-medium italic">Posted by: <span className="text-slate-900 font-bold">{task.buyer_name}</span></p>
                </div>
                <div className="bg-slate-900 text-white p-6 rounded-2xl text-center min-w-[150px] shadow-xl shadow-blue-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Reward</p>
                    <h2 className="text-3xl font-black text-yellow-400 mt-1">🪙 {task.payable_amount}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 2. Instructions Section (Left Side) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-6">
                            <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">📝</span>
                            How to complete this task?
                        </h3>

                        <div className="space-y-6 text-slate-600 leading-relaxed">
                            {/* মেইন ডেসক্রিপশন */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300">
                                <p className="font-medium">{task.description}</p>
                            </div>

                            {/* স্টেপ বাই স্টেপ গাইড (এটা ডেসক্রিপশন থেকে অটোমেটিক বা আলাদাভাবে দেওয়া যায়) */}
                            <div className="space-y-4">
                                <h4 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Step-by-Step Instructions:</h4>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 items-start">
                                        <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                                        <p className="text-sm font-medium">Open YouTube and perform the search as described above.</p>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                                        <p className="text-sm font-medium">Watch the required duration (2 minutes) carefully.</p>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                                        <p className="text-sm font-medium">Like and Subscribe, then take a screenshot for proof.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Submission Form Section (Right Side) */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-blue-200 shadow-sm shadow-blue-50">
                        <h3 className="text-xl font-black text-slate-800 mb-6">Submit Proof</h3>

                        <form className="space-y-5">
                            <div>
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">What to submit?</label>
                                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-xs font-bold leading-normal">
                                    ⚠️ {task.submission_info}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">Your Submission Text</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[100px]"
                                    placeholder="Enter your YouTube name or other text proof..."
                                    value={submissionText}
                                    onChange={(e) => setSubmissionText(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">Upload Screenshot</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition cursor-pointer">
                                    <span className="text-2xl">📸</span>
                                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">Click to upload image</p>
                                    <input type="file" className="hidden" />
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 active:scale-95">
                                SUBMIT WORK
                            </button>
                        </form>
                    </div>

                    {/* Task Info Summary */}
                    <div className="bg-slate-100 p-6 rounded-3xl space-y-3">
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-500">Deadline</span>
                            <span className="text-slate-800">{task.completion_date}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-500">Required Workers</span>
                            <span className="text-slate-800">{task.required_workers} Left</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TaskDetails;