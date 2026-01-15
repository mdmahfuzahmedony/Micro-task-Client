import React from 'react';

const TopEarners = () => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/40">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-20">
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-12">Top Earners</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                            <div className="w-14 h-14 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?u=${item}`} alt="user" />
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-900 dark:text-white">User {item}</h5>
                                <p className="text-emerald-500 font-bold">4,500 Coins</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default TopEarners;