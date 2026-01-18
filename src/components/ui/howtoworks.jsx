import React from 'react';
import { UserPlus, ClipboardList, Wallet, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            id: "01",
            icon: <UserPlus className="w-8 h-8" />,
            title: "Join the Community",
            color: "bg-blue-600 shadow-blue-200 dark:shadow-none",
            description: "Register as a Worker to start earning or a Buyer to post tasks. It’s quick, easy, and completely free to get started."
        },
        {
            id: "02",
            icon: <ClipboardList className="w-8 h-8" />,
            title: "Choose & Complete Tasks",
            color: "bg-purple-600 shadow-purple-200 dark:shadow-none",
            description: "Browse hundreds of micro-tasks like surveys, social media follows, or app reviews. Complete them and submit proof."
        },
        {
            id: "03",
            icon: <Wallet className="w-8 h-8" />,
            title: "Withdraw Your Earnings",
            color: "bg-emerald-600 shadow-emerald-200 dark:shadow-none",
            description: "Once your work is approved, coins are added to your wallet. Convert coins to real cash via BKash, Nagad, or Rocket."
        }
    ];

    return (
        <section className="py-10 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-[1600px]  mx-auto px-6 lg:px-0">

                {/* Header Part */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4">Process</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Start Earning in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">3 Simple Steps</span>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        We’ve made it incredibly easy for anyone to start earning from home. No experience required.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 relative">

                    {/* Desktop Connecting Line (Subtle) */}
                    <div className="hidden md:block absolute top-1/3 left-[15%] right-[15%] h-[2px] bg-slate-100 dark:bg-slate-800 -z-10"></div>

                    {steps.map((step, i) => (
                        <div key={i} className="group relative text-center">
                            {/* Step Number Badge */}
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-7xl font-black text-slate-100 dark:text-slate-900 group-hover:text-blue-500/10 transition-colors duration-500 -z-10 select-none">
                                {step.id}
                            </span>

                            {/* Icon Container */}
                            <div className={`w-20 h-20 ${step.color} text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                {step.icon}
                            </div>

                            {/* Text Content */}
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {step.title}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed ">
                                {step.description}
                            </p>

                            {/* Arrow Indicator for Mobile/Tablet */}
                            {i < 2 && (
                                <div className="md:hidden mt-8 text-slate-300 dark:text-slate-800 flex justify-center">
                                    <ArrowRight className="rotate-90" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;