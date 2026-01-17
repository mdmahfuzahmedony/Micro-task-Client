"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '@/components/ui/TaskCard';
import { Filter, SortAsc, RefreshCcw, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [loading, setLoading] = useState(true);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // প্রতি পেজে কয়টি টাস্ক দেখাবে

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/all-tasks')
            .then(res => {
                setTasks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    // Filter & Sort Logic
    const filteredTasks = tasks
        .filter(task => filterCategory ? task.task_title.toLowerCase().includes(filterCategory.toLowerCase()) : true)
        .sort((a, b) => {
            if (sortBy === 'low-to-high') return a.payable_amount - b.payable_amount;
            if (sortBy === 'high-to-low') return b.payable_amount - a.payable_amount;
            return 0;
        });

    // Pagination Calculation
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage);

    // Reset pagination when filter/sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filterCategory, sortBy]);

    return (
        <section className="py-10 bg-[#f8fafc] dark:bg-slate-950 min-h-screen">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-1 uppercase tracking-widest">
                            <LayoutGrid size={16} /> Explore Opportunities
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">All Available Tasks</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-400 uppercase">Showing {paginatedTasks.length} of {filteredTasks.length}</span>
                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
                        <div className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-800">
                            {filteredTasks.length} Found
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT SIDE: Task Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex flex-col justify-center items-center h-80 text-blue-600">
                                <RefreshCcw size={40} className="animate-spin mb-4" />
                                <p className="font-bold text-slate-400">Loading tasks...</p>
                            </div>
                        ) : paginatedTasks.length > 0 ? (
                            <div className="space-y-6">
                                {/* Grid Layout: Horizontal কার্ডের জন্য ১ বা ২ কলাম ভালো */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                    {paginatedTasks.map(task => (
                                        <TaskCard key={task._id} task={task} />
                                    ))}
                                </div>

                                {/* Pagination UI */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex justify-center items-center gap-2">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(prev => prev - 1)}
                                            className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>

                                        {[...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentPage(index + 1)}
                                                className={`w-11 h-11 rounded-xl font-bold transition-all ${currentPage === index + 1
                                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                                                    }`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}

                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
                                <p className="text-slate-400 italic text-lg font-medium">No tasks match your current filters.</p>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDE: Slim Sidebar */}
                    <div className="lg:w-72 flex-shrink-0">
                        <div className="sticky top-24 space-y-6">

                            {/* Filter Box */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
                                <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold mb-4 text-sm uppercase tracking-tight">
                                    <Filter size={16} className="text-blue-500" /> Categories
                                </h4>
                                <div className="space-y-2">
                                    {['', 'YouTube', 'Facebook', 'Survey', 'App Download'].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setFilterCategory(cat)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${filterCategory === cat
                                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-100 dark:border-blue-800'
                                                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                                }`}
                                        >
                                            {cat === '' ? 'All Tasks' : cat}
                                        </button>
                                    ))}
                                </div>

                                <div className="my-6 h-[1px] bg-slate-100 dark:bg-slate-800"></div>

                                <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold mb-4 text-sm uppercase tracking-tight">
                                    <SortAsc size={16} className="text-emerald-500" /> Sort By
                                </h4>
                                <select
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl outline-none text-sm font-bold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="">Default</option>
                                    <option value="high-to-low">High Reward</option>
                                    <option value="low-to-high">Low Reward</option>
                                </select>

                                {/* Reset Button */}
                                <button
                                    onClick={() => { setFilterCategory(''); setSortBy(''); }}
                                    className="mt-6 w-full py-3 flex items-center justify-center gap-2 text-xs font-black text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-widest"
                                >
                                    <RefreshCcw size={14} /> Clear All
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllTasks;