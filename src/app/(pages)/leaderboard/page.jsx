"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Globe, Search, Medal, Award, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [filterCountry, setFilterCountry] = useState('Global');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // এখানে তোমার ইউজার লিস্ট এপিআই কল হবে
        // ইউজারদের অবশ্যই 'balance' অনুযায়ী সর্ট করে আনতে হবে
        axios.get('http://localhost:5000/users')
            .then(res => {
                // সর্ট করা ব্যালেন্স অনুযায়ী (বড় থেকে ছোট)
                const sortedUsers = res.data.sort((a, b) => b.balance - a.balance);
                setUsers(sortedUsers);
            })
            .catch(err => console.log(err));
    }, []);

    // কান্ট্রি এবং সার্চ অনুযায়ী ডাটা ফিল্টার
    const filteredUsers = users.filter(user => {
        const matchesCountry = filterCountry === 'Global' || user.country === filterCountry;
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCountry && matchesSearch;
    });

    const topThree = filteredUsers.slice(0, 3);
    const restOfUsers = filteredUsers.slice(3);

    return (
        <section className="py-12 bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-20">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-sm font-bold uppercase tracking-wider mb-4">
                        <Trophy size={16} />
                        <span>Community Hall of Fame</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Top Earners <span className="text-blue-600">Leaderboard</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Celebrate the success of our most hardworking community members from around the world.
                    </p>
                </div>

                {/* Filters Section */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-slate-50 dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search user name..."
                            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 rounded-2xl outline-none border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Globe className="text-blue-500" size={20} />
                        <select
                            className="w-full md:w-64 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none font-bold text-slate-700 dark:text-slate-200"
                            onChange={(e) => setFilterCountry(e.target.value)}
                        >
                            <option value="Global">Global Ranking</option>
                            <option value="Bangladesh">🇧🇩 Bangladesh</option>
                            <option value="USA">🇺🇸 USA</option>
                            <option value="India">🇮🇳 India</option>
                            <option value="Pakistan">🇵🇰 Pakistan</option>
                        </select>
                    </div>
                </div>

                {/* TOP 3 PODIUM */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
                    {/* Rank 2 */}
                    {topThree[1] && (
                        <div className="order-2 md:order-1 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center relative pt-16 h-[350px] flex flex-col justify-center shadow-lg">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-3xl border-4 border-slate-300 overflow-hidden shadow-xl">
                                <img src={topThree[1].image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <Medal className="absolute top-10 right-10 text-slate-400" size={32} />
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{topThree[1].name}</h3>
                            <p className="text-slate-400 font-medium mb-4">{topThree[1].country}</p>
                            <p className="text-3xl font-black text-slate-500">{topThree[1].balance} <span className="text-sm">Coins</span></p>
                            <div className="mt-6 inline-block bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-sm font-bold text-slate-500">2nd Place</div>
                        </div>
                    )}

                    {/* Rank 1 (Gold) */}
                    {topThree[0] && (
                        <div className="order-1 md:order-2 bg-gradient-to-b from-blue-600 to-indigo-700 p-10 rounded-[3rem] text-center relative pt-20 h-[420px] flex flex-col justify-center shadow-2xl shadow-blue-500/20 scale-105 z-10">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-3xl border-4 border-yellow-400 overflow-hidden shadow-2xl">
                                <img src={topThree[0].image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <Trophy className="absolute top-12 right-12 text-yellow-400 animate-bounce" size={48} />
                            <h3 className="text-3xl font-bold text-white mb-1">{topThree[0].name}</h3>
                            <p className="text-blue-100 font-medium mb-6 opacity-80">{topThree[0].country}</p>
                            <p className="text-5xl font-black text-white">{topThree[0].balance} <span className="text-lg">Coins</span></p>
                            <div className="mt-8 inline-block bg-yellow-400 text-blue-900 px-6 py-2 rounded-full text-md font-black uppercase tracking-widest">Champion</div>
                        </div>
                    )}

                    {/* Rank 3 */}
                    {topThree[2] && (
                        <div className="order-3 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center relative pt-16 h-[320px] flex flex-col justify-center shadow-lg">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-3xl border-4 border-amber-600/30 overflow-hidden shadow-xl">
                                <img src={topThree[2].image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <Award className="absolute top-10 right-10 text-amber-600" size={32} />
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{topThree[2].name}</h3>
                            <p className="text-slate-400 font-medium mb-4">{topThree[2].country}</p>
                            <p className="text-3xl font-black text-amber-700">{topThree[2].balance} <span className="text-sm">Coins</span></p>
                            <div className="mt-6 inline-block bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-full text-sm font-bold text-amber-600">3rd Place</div>
                        </div>
                    )}
                </div>

                {/* THE REST OF USERS TABLE */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-widest">Rank</th>
                                <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-widest">User</th>
                                <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-widest">Country</th>
                                <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-widest text-right">Total Coins</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {restOfUsers.map((user, index) => (
                                <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="p-6 font-black text-slate-400">#{index + 4}</td>
                                    <td className="p-6 flex items-center gap-4">
                                        <img src={user.image} className="w-10 h-10 rounded-xl object-cover" alt="" />
                                        <span className="font-bold text-slate-700 dark:text-white">{user.name}</span>
                                    </td>
                                    <td className="p-6 text-slate-500 dark:text-slate-400 font-medium">{user.country || 'N/A'}</td>
                                    <td className="p-6 text-right font-black text-emerald-500 text-xl">{user.balance.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    );
};

export default Leaderboard;