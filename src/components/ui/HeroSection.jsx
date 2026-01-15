import React from 'react';
import { ArrowRight, Sparkles, Target } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative w-full bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
            {/* Background Decorative Elements - ডার্ক মোডে সুন্দর আভা দিবে */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 dark:bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 dark:bg-purple-600/10 blur-[120px] rounded-full"></div>
            </div>

            {/* Container with Max-width 1600px */}
            <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12 relative z-10">

                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left space-y-8">
                    {/* Small Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide animate-fade-in">
                        <Sparkles size={16} />
                        <span>The Best Micro-Tasking Platform</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1]">
                        Turn Your Time Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">Real Earnings</span>
                    </h1>

                    {/* Subtext */}
                    <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                        Join thousands of users earning daily by completing simple tasks.
                        Whether you're a worker looking to earn or a buyer needing quality tasks done,
                        we've got you covered.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-200 dark:shadow-none">
                            Start Earning Now <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm">
                            Hire Talent
                        </button>
                    </div>

                    {/* Platform Trust Stats (Optional) */}
                    <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">50k+</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Active Workers</p>
                        </div>
                        <div className="w-[1px] h-10 bg-slate-200 dark:bg-slate-800"></div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">$120k+</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Paid Out</p>
                        </div>
                    </div>
                </div>

                {/* Hero Image/Illustration Placeholder */}
                <div className="flex-1 w-full max-w-2xl lg:max-w-none">
                    <div className="relative group">
                        {/* Decorative background for image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl group-hover:blur-[50px] transition-all duration-500"></div>

                        {/* Image Container */}
                        <div className="relative bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                            {/* এখানে তুমি তোমার কোনো কাজের স্ক্রিনশট বা ইলস্ট্রেশন দিতে পারো */}
                            <div className="text-center p-12">
                                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                                    <Target size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Platform Preview</h3>
                                <p className="text-slate-500 dark:text-slate-400">Dashboard & Task Interface Illustration</p>
                            </div>
                        </div>

                        {/* Floating Badge Example */}
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 hidden sm:flex items-center gap-3 animate-bounce-slow">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                                <ArrowRight size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400">Latest Payment</p>
                                <p className="text-sm font-bold text-slate-800 dark:text-white">$25.50 Sent to BKash</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;