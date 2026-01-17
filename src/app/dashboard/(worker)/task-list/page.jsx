"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import TaskCard from '@/components/ui/TaskCard'; // আপনার তৈরি করা সেই নতুন কার্ডটি
import { Search, Filter, SortAsc, RefreshCcw, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState('');
    const [sortBy, setSortBy] = useState('');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // প্রতি পেজে ৬টি করে টাস্ক দেখাবে

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                // আপনার API URL এখানে বসাবেন
                const res = await axios.get('http://localhost:5000/all-tasks');
                // শুধুমাত্র যাদের required_workers > 0 তাদের ফিল্টার করে রাখা ভালো
                const available = res.data.filter(task => task.required_workers > 0);
                setTasks(available);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    // filtering and sorting logic
    const filteredTasks = tasks
        .filter(task => filterCategory ? task.task_title.toLowerCase().includes(filterCategory.toLowerCase()) : true)
        .sort((a, b) => {
            if (sortBy === 'low-to-high') return a.payable_amount - b.payable_amount;
            if (sortBy === 'high-to-low') return b.payable_amount - a.payable_amount;
            return 0;
        });

    // Pagination Calculations
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage);

    // Filter পরিবর্তন হলে পেজ ১-এ নিয়ে যাওয়া
    useEffect(() => {
        setCurrentPage(1);
    }, [filterCategory, sortBy]);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">

            {/* --- TOP SECTION: Header & Stats --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <Layers className="text-blue-600" /> Available Tasks
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Complete micro-tasks and grow your coin balance.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-5 py-3 rounded-2xl border border-blue-100 dark:border-blue-800">
                    <span className="text-blue-600 font-black text-xl leading-none">{filteredTasks.length}</span>
                    <span className="text-blue-600/70 text-sm font-bold uppercase tracking-wider">Tasks Ready</span>
                </div>
            </div>

            {/* --- MIDDLE SECTION: Filters & Sorting (Horizontal Bar) --- */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-8 flex flex-wrap items-center gap-4">

                {/* Category Selector */}
                <div className="flex-grow min-w-[200px]">
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <select
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setFilterCategory(e.target.value)}
                            value={filterCategory}
                        >
                            <option value="">All Categories</option>
                            <option value="YouTube">YouTube Tasks</option>
                            <option value="Facebook">Facebook Tasks</option>
                            <option value="Survey">Surveys</option>
                            <option value="App">App Installs</option>
                        </select>
                    </div>
                </div>

                {/* Sort Selector */}
                <div className="flex-grow md:flex-grow-0 min-w-[180px]">
                    <div className="relative">
                        <SortAsc className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <select
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setSortBy(e.target.value)}
                            value={sortBy}
                        >
                            <option value="">Sort By Price</option>
                            <option value="high-to-low">High Reward</option>
                            <option value="low-to-high">Low Reward</option>
                        </select>
                    </div>
                </div>

                {/* Reset Button */}
                <button
                    onClick={() => { setFilterCategory(''); setSortBy(''); }}
                    className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 rounded-xl transition-colors"
                    title="Reset Filters"
                >
                    <RefreshCcw size={20} />
                </button>
            </div>

            {/* --- BOTTOM SECTION: Task List Grid --- */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 font-bold text-slate-400 uppercase tracking-widest text-xs">Fetching Tasks...</p>
                </div>
            ) : paginatedTasks.length > 0 ? (
                <div className="space-y-8">
                    {/* টাস্কগুলোকে নিচে নিচে দেখানোর জন্য এক কলামের গ্রিড */}
                    <div className="grid grid-cols-2 gap-6">
                        {paginatedTasks.map((task) => (
                            <Link key={task.id || task._id} href={`/dashboard/task-list/${task.id || task._id}`}>
                                <TaskCard task={task} />
                            </Link>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 pt-6">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-blue-50 transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentPage(idx + 1)}
                                        className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${currentPage === idx + 1
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:border-blue-300'
                                            }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-blue-50 transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 shadow-inner">
                    <div className="text-5xl mb-4">🏜️</div>
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Tasks Found</h3>
                    <p className="text-slate-400 mt-2">Try changing your filters or category.</p>
                </div>
            )}
        </div>
    );
};

export default TaskList;