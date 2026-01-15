import React from 'react';
import { ShieldCheck, Zap, CreditCard, Headphones, BarChart3, Users } from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            title: "Secure Payments",
            description: "Every penny you earn is safe with us. We use industry-leading encryption to protect your transactions.",
            icon: <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            bgColor: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            title: "Instant Withdraw",
            description: "No more long waits! Withdraw your earnings instantly via BKash, Nagad, or other popular methods.",
            icon: <Zap className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
            bgColor: "bg-amber-50 dark:bg-amber-900/20"
        },
        {
            title: "Multiple Task Categories",
            description: "From data entry to social media engagement, choose from hundreds of available tasks daily.",
            icon: <BarChart3 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
            bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
        },
        {
            title: "Quality Traffic",
            description: "Buyers get high-quality engagement from real users. No bots, only genuine human interaction.",
            icon: <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
            bgColor: "bg-purple-50 dark:bg-purple-900/20"
        },
        {
            title: "Low Service Fees",
            description: "We charge the lowest commissions in the market so that workers can keep more of their earnings.",
            icon: <CreditCard className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
            bgColor: "bg-rose-50 dark:bg-rose-900/20"
        },
        {
            title: "24/7 Dedicated Support",
            description: "Stuck somewhere? Our support team is available around the clock to solve your issues quickly.",
            icon: <Headphones className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
            bgColor: "bg-cyan-50 dark:bg-cyan-900/20"
        }
    ];

    return (
        <section className="w-full py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-20">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-3">Our Core Features</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Why Thousands of People Trust Our Platform
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        We provide a seamless experience for both buyers and workers with our
                        powerful tools and secure infrastructure.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
                        >
                            <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                {feature.title}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Optional Bottom CTA */}
                <div className="mt-20 text-center p-12 bg-blue-600 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <h4 className="text-3xl font-bold text-white mb-4">Ready to boost your income?</h4>
                        <p className="text-blue-100 mb-8 max-w-xl mx-auto">Join our community today and start earning by doing simple tasks from the comfort of your home.</p>
                        <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-xl">
                            Create Free Account
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeaturesSection;