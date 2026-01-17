import React from 'react';
import { Users, Coins, Calendar, ArrowRight, User, ExternalLink } from 'lucide-react';

const TaskCard = ({ task }) => {
    // ডাটা ডিস্ট্রাকচারিং
    const {
        task_title,
        buyer_name,
        completion_date,
        payable_amount,
        required_workers,
        task_image_url
    } = task;

    return (
        <div className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-4 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center">

            {/* Left Side: Small Image Section */}
            <div className="relative flex-shrink-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 overflow-hidden rounded-2xl border-4 border-slate-50 dark:border-slate-700 shadow-sm">
                    <img
                        src={task_image_url || "https://via.placeholder.com/150"}
                        alt={task_title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                {/* Coins Badge overlay on image or nearby */}
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
                    <Coins size={12} />
                    {payable_amount}
                </div>
            </div>

            {/* Right Side: Content Section */}
            <div className="flex-grow flex flex-col justify-between w-full">

                <div className="space-y-2">
                    {/* Buyer Info */}
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
                        <User size={12} className="text-blue-500" />
                        <span>{buyer_name}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
                        {task_title}
                    </h3>

                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center gap-4 pt-1">
                        <div className="flex items-center gap-1.5">
                            <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-md text-blue-600">
                                <Users size={14} />
                            </div>
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{required_workers} Left</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <div className="p-1.5 bg-rose-50 dark:bg-rose-900/30 rounded-md text-rose-600">
                                <Calendar size={14} />
                            </div>
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{completion_date}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Action Area */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payable:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                            <Coins size={14} /> {payable_amount}
                        </span>
                    </div>

                    <button className="px-5 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95 shadow-md shadow-blue-500/10">
                        View Details <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;