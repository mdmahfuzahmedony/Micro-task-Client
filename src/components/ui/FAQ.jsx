import React from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Zap } from 'lucide-react';

const FAQSection = () => {
    const faqs = [
        {
            q: "How do I withdraw my earnings?",
            a: "You can withdraw your earnings once you reach the minimum balance of 200 coins. We support major local payment methods including BKash, Nagad, and Rocket. Withdrawals are typically processed within 24 hours of the request."
        },
        {
            q: "Is there any limit to daily tasks?",
            a: "Absolutely not! You can complete as many tasks as you want. The more tasks you finish accurately, the more your reputation grows, giving you access to higher-paying premium jobs."
        },
        {
            q: "What is the coin conversion rate?",
            a: "Our current rate is 20 coins = $1. However, this may vary based on platform promotions. You can always see the real-time conversion value in your worker dashboard."
        },
        {
            q: "Can I be both a Buyer and a Worker?",
            a: "Yes! You can use the same account to post tasks as a buyer or complete tasks as a worker. You just need to switch your dashboard view from your profile settings."
        },
        {
            q: "What happens if a buyer rejects my work?",
            a: "If your work is rejected unfairly, you can 'Dispute' the decision. our admin team will manually review your proof and the buyer's requirements to ensure a fair outcome for both parties."
        }
    ];

    return (
        <section className="py-10 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-0 border">

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Left Side: Title & Info */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wider">
                            <HelpCircle size={16} />
                            <span>Support Center</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                            Frequently Asked <span className="text-blue-600">Questions</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Have questions about how our platform works? We’ve gathered the most common queries to help you get started smoothly.
                        </p>

                        {/* Help Card */}
                        <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                                <MessageCircle size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Still have questions?</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                Can't find the answer you're looking for? Reach out to our 24/7 support team.
                            </p>
                            <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-2">
                                Contact Support <Zap size={16} className="fill-current" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Accordion */}
                    <div className="lg:w-2/3 space-y-4">
                        {faqs.map((faq, i) => (
                            <details
                                key={i}
                                className="group p-2 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all duration-300 open:bg-slate-50 dark:open:bg-slate-900 open:border-blue-200 dark:open:border-blue-900/50 open:shadow-xl open:shadow-blue-500/5"
                            >
                                <summary className="flex justify-between items-center p-4 font-bold text-lg md:text-xl text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none">
                                    <span className="pr-6">{faq.q}</span>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-open:bg-blue-600 group-open:text-white transition-all duration-300">
                                        <ChevronDown className="group-open:rotate-180 transition-transform duration-300" size={20} />
                                    </div>
                                </summary>
                                <div className="px-4 pb-6 pt-2 text-slate-600 dark:text-slate-400 leading-relaxed text-lg border-t border-slate-100 dark:border-slate-800 mt-2">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQSection;