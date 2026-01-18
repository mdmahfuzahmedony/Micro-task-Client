"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import axios from 'axios';
import { Coins, DollarSign, CreditCard, Send, AlertCircle, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2'; // মেসেজ দেখানোর জন্য

const WithdrawalForm = () => {
    const { data: session } = useSession();
    const [userCoins, setUserCoins] = useState(0); // ডাটাবেস থেকে পাওয়া টোটাল কয়েন
    const [loading, setLoading] = useState(true);

    // Form States
    const [withdrawCoin, setWithdrawCoin] = useState(0);
    const [paymentSystem, setPaymentSystem] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ১ ডলার = ২০ কয়েন (Worker Logic)
    const COIN_TO_DOLLAR_RATE = 20;
    const MIN_WITHDRAW_COIN = 200; // ১০ ডলার

    // ডাটাবেস থেকে ইউজারের কারেন্ট কয়েন ফেচ করা
    useEffect(() => {
        if (session?.user?.email) {
            axios.get(`http://localhost:5000/user-stats/${session.user.email}`)
                .then(res => {
                    setUserCoins(res.data.coins || 0);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching user stats:", err);
                    setLoading(false);
                });
        }
    }, [session?.user?.email]);

    // অটোমেটিক ডলার ক্যালকুলেশন
    const withdrawAmount = (withdrawCoin / COIN_TO_DOLLAR_RATE).toFixed(2);
    const currentDollarValue = (userCoins / COIN_TO_DOLLAR_RATE).toFixed(2);

    const handleWithdraw = async (e) => {
        e.preventDefault();
        
        if (withdrawCoin < MIN_WITHDRAW_COIN) {
            return Swal.fire("Error", "Minimum withdrawal is 200 coins ($10)", "error");
        }
        if (withdrawCoin > userCoins) {
            return Swal.fire("Error", "You don't have enough coins!", "error");
        }

        setIsSubmitting(true);
        const withdrawData = {
            worker_email: session?.user?.email,
            worker_name: session?.user?.name,
            withdrawal_coin: parseInt(withdrawCoin),
            withdrawal_amount: parseFloat(withdrawAmount),
            payment_system: paymentSystem,
            account_number: accountNumber,
            withdraw_date: new Date(),
            status: 'pending'
        };

        try {
            const response = await axios.post('http://localhost:5000/withdrawals', withdrawData);
            if (response.data.insertedId) {
                Swal.fire("Success", "Withdrawal request sent successfully!", "success");
                setUserCoins(prev => prev - withdrawCoin); // লোকাল স্টেট আপডেট
                setWithdrawCoin(0);
                setAccountNumber('');
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong. Try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-500" /></div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-black mb-6 text-slate-800">Withdraw Earnings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Current Coin Card */}
                <div className="bg-amber-500 text-white p-6 rounded-3xl shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80">Total Coins</p>
                        <h3 className="text-4xl font-black">{userCoins}</h3>
                    </div>
                    <Coins size={48} className="opacity-30" />
                </div>

                {/* Current Dollar Card */}
                <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80">Withdrawal Amount</p>
                        <h3 className="text-4xl font-black">${currentDollarValue}</h3>
                    </div>
                    <DollarSign size={48} className="opacity-30" />
                </div>
            </div>

            {/* Withdrawal Form */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                <form onSubmit={handleWithdraw} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Coin to Withdraw */}
                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2">Coins to Withdraw</label>
                            <input
                                type="number"
                                value={withdrawCoin}
                                onChange={(e) => setWithdrawCoin(e.target.value)}
                                min={0}
                                max={userCoins}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none ring-2 ring-transparent focus:ring-blue-500 transition-all font-bold"
                                placeholder="Enter coin amount"
                                required
                            />
                        </div>

                        {/* Amount in Dollars (Read Only) */}
                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2">Withdraw Amount ($)</label>
                            <div className="w-full p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-emerald-600 text-lg flex items-center gap-2">
                                <DollarSign size={18} /> {withdrawAmount}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Payment System */}
                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2">Payment System</label>
                            <select
                                value={paymentSystem}
                                onChange={(e) => setPaymentSystem(e.target.value)}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none ring-2 ring-transparent focus:ring-blue-500 transition-all font-bold"
                                required
                            >
                                <option value="">Select System</option>
                                <option value="Stripe">Stripe</option>
                                <option value="Bkash">Bkash</option>
                                <option value="Nagad">Nagad</option>
                                <option value="Rocket">Rocket</option>
                            </select>
                        </div>

                        {/* Account Number */}
                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2">Account Number / Email</label>
                            <input
                                type="text"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none ring-2 ring-transparent focus:ring-blue-500 transition-all font-bold"
                                placeholder="Enter number or email"
                                required
                            />
                        </div>
                    </div>

                    {/* Logic for Button visibility */}
                    {userCoins >= MIN_WITHDRAW_COIN ? (
                        <button
                            type="submit"
                            disabled={isSubmitting || withdrawCoin > userCoins || withdrawCoin <= 0}
                            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={24} />}
                            Withdraw Now
                        </button>
                    ) : (
                        <div className="flex items-center gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-2xl border border-rose-100 dark:border-rose-800 font-bold justify-center">
                            <AlertCircle size={20} />
                            Insufficient coins (Minimum 200 required)
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default WithdrawalForm;