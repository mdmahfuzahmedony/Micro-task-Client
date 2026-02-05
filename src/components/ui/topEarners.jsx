import React from 'react';
import { Trophy, Medal, Target, Award } from 'lucide-react';

const TopEarners = () => {
    // সাধারণত তুমি এই ডাটা API থেকে নিবে, এখানে ডেমো হিসেবে সাজানো হলো
    const topUsers = [
        { id: 1, name: "Ariful Islam", coins: 15400, tasks: 120, rank: 1, avatar: "https://i.pravatar.cc/150?u=1" },
        { id: 2, name: "Sumaiya Akter", coins: 12850, tasks: 98, rank: 2, avatar: "https://i.pravatar.cc/150?u=2" },
        { id: 3, name: "Tanvir Ahmed", coins: 10200, tasks: 85, rank: 3, avatar: "https://i.pravatar.cc/150?u=3" },
        { id: 4, name: "Mehedi Hasan", coins: 8900, tasks: 72, rank: 4, avatar: "https://i.pravatar.cc/150?u=4" },
        { id: 5, name: "Nusrat Jahan", coins: 7500, tasks: 65, rank: 5, avatar: "https://i.pravatar.cc/150?u=5" },
        { id: 6, name: "Rakib Hossain", coins: 6800, tasks: 58, rank: 6, avatar: "https://i.pravatar.cc/150?u=6" },
    ];

    const getRankIcon = (rank) => {
        if (rank === 1) return <Trophy className="text-yellow-500" size={24} />;
        if (rank === 2) return <Medal className="text-slate-400" size={24} />;
        if (rank === 3) return <Award className="text-amber-600" size={24} />;
        return <span className="font-bold text-slate-400">#{rank}</span>;
    };

    return (
        <section className="py-24">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-0 ">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-sm mb-3">
                            <Target size={18} />
                            <span>Top Performers</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Champion Workers</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            These individuals are the pillars of our community, consistently delivering quality work and earning the highest rewards.
                        </p>
                    </div>
                    <button className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm shrink-0">
                        View Full Leaderboard
                    </button>
                </div>

                {/* Earners Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topUsers.map((user) => (
                        <div
                            key={user.id}
                            className="group relative bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
                        >
                            {/* Background Decorative Blur for Top 3 */}
                            {user.rank <= 3 && (
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                            )}

                            <div className="flex items-center gap-6 relative z-10">
                                {/* Avatar Container */}
                                <div className="relative">
                                    <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 ${user.rank <= 3 ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700'}`}>
                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    {/* Rank Badge */}
                                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-800">
                                        {getRankIcon(user.rank)}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {user.name}
                                    </h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                        {user.tasks} Tasks Completed
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-[1px] w-full bg-slate-50 dark:bg-slate-700/50 my-5"></div>

                            {/* Coin Stats */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400">
                                        <Award size={18} />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Earnings</span>
                                </div>
                                <div className="text-2xl font-black text-emerald-500 dark:text-emerald-400">
                                    {user.coins.toLocaleString()} <span className="text-xs font-bold text-slate-400 uppercase">Coins</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Stats Insight */}
                <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
                    <p className="text-slate-700 dark:text-slate-300 font-medium italic">
                        "Success is not final, but consistent earning is!" Join these top earners today.
                    </p>
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?u=img${i}`} alt="user" />
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white dark:border-slate-800">
                            +2k
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TopEarners;