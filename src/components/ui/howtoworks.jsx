import React from 'react';
import { UserPlus, ClipboardList, Wallet } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        { icon: <UserPlus />, title: "Create Account", color: "bg-blue-500" },
        { icon: <ClipboardList />, title: "Complete Tasks", color: "bg-purple-500" },
        { icon: <Wallet />, title: "Get Paid", color: "bg-emerald-500" }
    ];
    return (
        <section className="py-24 max-w-[1600px] mx-auto px-6 lg:px-20">
            <h2 className="text-center text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {steps.map((step, i) => (
                    <div key={i} className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <div className={`w-16 h-16 ${step.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>{step.icon}</div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400">Simple process to get started and earn.</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default HowItWorks;