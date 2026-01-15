"use client";
import React, { useState } from 'react';

const Withdrawals = () => {
    const [withdrawCoins, setWithdrawCoins] = useState(0);
    const currentBalance = 12450; // ডামি ব্যালেন্স
    const coinToDollarRate = 20; // ২০ কয়েন = ১ ডলার (আপনার নোট অনুযায়ী)

    const withdrawalAmountInDollar = (withdrawCoins / coinToDollarRate).toFixed(2);

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 font-sans">

            {/* Balance Summary Card */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-8 rounded-3xl text-white shadow-xl flex justify-between items-center">
                <div>
                    <p className="text-blue-200 text-sm font-medium">Available Balance</p>
                    <h2 className="text-5xl font-black mt-2">🪙 {currentBalance}</h2>
                    <p className="text-blue-300 text-xs mt-3 uppercase tracking-widest">
                        ≈ ${(currentBalance / coinToDollarRate).toFixed(2)} USD
                    </p>
                </div>
                <div className="hidden md:block text-6xl opacity-20 italic font-black text-white">WITHDRAW</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Withdrawal Form */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-fit">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Request Withdrawal</h3>
                    <form className="space-y-5">
                        <div>
                            <label className="text-sm text-slate-500 font-bold mb-2 block">Coins to Withdraw</label>
                            <input
                                type="number"
                                onChange={(e) => setWithdrawCoins(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
                                placeholder="Enter amount of coins"
                            />
                            <p className="mt-2 text-xs text-blue-600 font-medium italic">
                                You will receive: ${withdrawalAmountInDollar}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm text-slate-500 font-bold mb-2 block">Payment Method</label>
                            <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium">
                                <option>bKash (Personal)</option>
                                <option>Nagad</option>
                                <option>Rocket</option>
                                <option>Binance (USDT)</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-slate-500 font-bold mb-2 block">Account/Wallet Number</label>
                            <input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none" placeholder="017XXXXXXXX / Wallet ID" />
                        </div>

                        <button
                            disabled={withdrawCoins < 100}
                            className={`w-full py-4 rounded-2xl font-black text-white transition-all shadow-lg ${withdrawCoins >= 100 ? 'bg-slate-900 hover:bg-blue-600' : 'bg-slate-300 cursor-not-allowed'
                                }`}
                        >
                            WITHDRAW NOW
                        </button>
                        <p className="text-[10px] text-center text-slate-400">Minimum withdrawal: 2000 Coins ($1.00)</p>
                    </form>
                </div>

                {/* Info & Rules Card */}
                <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100 h-fit">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">Withdrawal Policy</h3>
                    <ul className="space-y-4 text-sm text-blue-800/80 font-medium">
                        <li className="flex gap-3">
                            <span className="text-blue-500">📌</span>
                            <span>Exchange Rate: <strong>{coinToDollarRate} Coins = $1.00 USD</strong>.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-blue-500">📌</span>
                            <span>Withdrawals are processed within <strong>24 to 72 hours</strong>.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-blue-500">📌</span>
                            <span>Double check your account number. Admin is not responsible for wrong numbers.</span>
                        </li>
                        <li className="flex gap-3 font-bold text-red-600">
                            <span className="text-red-500">⚠️</span>
                            <span>Any cheating attempt will result in account ban and forfeiture of coins.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Withdrawals;