import React from 'react';

const WithdrawFunds = () => {
    return (
        <div className="bg-[#0a192f] min-h-screen text-white p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-8 rounded-3xl mb-8 shadow-xl">
                    <p className="text-blue-200">Total Balance</p>
                    <h2 className="text-4xl font-bold">🪙 12,450 Coins</h2>
                    <p className="text-sm mt-2 text-blue-200">≈ $12.45 USD</p>
                </div>

                <div className="bg-[#112240] p-8 rounded-2xl border border-gray-800">
                    <h3 className="text-xl font-bold mb-6">Request Withdrawal</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Select Method</label>
                            <select className="w-full bg-[#0a192f] border border-gray-700 p-3 rounded-lg focus:border-blue-500 outline-none">
                                <option>bKash (Personal)</option>
                                <option>Nagad</option>
                                <option>Rocket</option>
                                <option>Binance (USDT)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Account Number</label>
                            <input type="text" className="w-full bg-[#0a192f] border border-gray-700 p-3 rounded-lg" placeholder="017xxxxxxxx" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Amount (Coins)</label>
                            <input type="number" className="w-full bg-[#0a192f] border border-gray-700 p-3 rounded-lg" placeholder="Minimum 5000 Coins" />
                        </div>

                        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                            <p className="text-xs text-red-400 font-medium">⚠️ Note: Withdrawal takes 24-72 hours to process.</p>
                        </div>

                        <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold transition">Withdraw Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WithdrawFunds;