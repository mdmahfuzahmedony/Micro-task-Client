"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import CheckoutForm from "../CheckoutForm";
import { IoDiamondOutline } from "react-icons/io5"; // আইকন ব্যবহারের জন্য (npm i react-icons)

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51SdOhK7Jg6gJBZW4LwwfzuhcV0QHFUQcXbyqVVrMnJ21QpyXb1Q85P44UL3Rt4C5x1zy8cSHHk5qiIkRxVgW97lM00ykwY58EL");

const PurchaseCoin = () => {
    const { data: session } = useSession();
    const [selectedPkg, setSelectedPkg] = useState(null);

    const coinPackages = [
        { coins: 10, price: 1, color: "from-blue-500 to-indigo-600" },
        { coins: 150, price: 10, color: "from-purple-500 to-pink-600" },
        { coins: 500, price: 20, color: "from-amber-500 to-orange-600" },
        { coins: 1000, price: 35, color: "from-emerald-500 to-teal-600" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        Refill Your <span className="text-indigo-600 dark:text-indigo-400">Coins</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                        Choose a package that fits your needs. Get more coins to post more tasks and reach more workers.
                    </p>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coinPackages.map((pkg, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedPkg(pkg)}
                            className={`relative group cursor-pointer transition-all duration-500 transform hover:-translate-y-2 
                            ${selectedPkg?.coins === pkg.coins
                                    ? 'scale-105 ring-4 ring-indigo-500 ring-offset-4 dark:ring-offset-slate-950'
                                    : ''}`}
                        >
                            <div className={`h-full p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 
                                ${selectedPkg?.coins === pkg.coins ? 'border-transparent' : 'border-slate-200 dark:border-slate-800'} 
                                shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center overflow-hidden`}
                            >
                                {/* Decorative Gradient Circle */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${pkg.color} opacity-10 group-hover:opacity-20 transition-opacity rounded-full`}></div>

                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                                    <IoDiamondOutline size={32} />
                                </div>

                                <h3 className="text-3xl font-black text-slate-800 dark:text-white">
                                    {pkg.coins}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Coins</p>

                                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                                    <span className="text-xl">$</span>{pkg.price}
                                </div>

                                <div className={`mt-6 px-6 py-2 rounded-full text-sm font-bold transition-all 
                                    ${selectedPkg?.coins === pkg.coins
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                                    {selectedPkg?.coins === pkg.coins ? 'Selected' : 'Select Plan'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment Section */}
                {selectedPkg && (
                    <div className="mt-20 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-8 border-b dark:border-slate-800 pb-6">
                                <div>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Order Summary</p>
                                    <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                                        {selectedPkg.coins} Coins Package
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">${selectedPkg.price}</p>
                                </div>
                            </div>

                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    price={selectedPkg.price}
                                    coins={selectedPkg.coins}
                                    userEmail={session?.user?.email}
                                    userName={session?.user?.name}
                                />
                            </Elements>

                            <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
                                Secure encrypted payment powered by Stripe. No card info is stored.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseCoin;