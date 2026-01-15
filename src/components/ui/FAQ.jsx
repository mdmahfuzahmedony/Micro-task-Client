import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
    const faqs = [
        { q: "How do I withdraw?", a: "Via BKash, Nagad, Rocket." },
        { q: "Is there a limit?", a: "No daily limits on tasks." }
    ];
    return (
        <section className="py-24 max-w-[1600px] mx-auto px-6 lg:px-20">
            <h2 className="text-center text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-16">FAQ</h2>
            <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, i) => (
                    <details key={i} className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 cursor-pointer">
                        <summary className="flex justify-between items-center font-bold text-lg text-slate-900 dark:text-white list-none">
                            {faq.q} <ChevronDown className="group-open:rotate-180 transition-transform" />
                        </summary>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">{faq.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
};
export default FAQSection;