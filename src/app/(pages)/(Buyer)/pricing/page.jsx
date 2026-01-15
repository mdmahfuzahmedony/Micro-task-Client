// pricing/page.js

import React from 'react';

const PricingPlans = () => {
    const plans = [
        { name: 'Basic', price: 'Free', fee: '15%', support: 'Email Support', limit: '5 Tasks/Day' },
        { name: 'Professional', price: '$10/mo', fee: '5%', support: 'Priority Support', limit: 'Unlimited' },
        { name: 'Enterprise', price: '$25/mo', fee: '0%', support: 'Dedicated Manager', limit: 'Unlimited' },
    ];

    return (
        <div className="bg-[#0a192f] min-h-screen text-white py-16 px-4">
            <h2 className="text-4xl font-bold text-center mb-12 font-sans">Buyer Membership Plans</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                    <div key={index} className={`p-8 rounded-2xl border ${index === 1 ? 'border-blue-500 bg-blue-500/5 scale-105' : 'border-gray-800 bg-[#112240]'}`}>
                        <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                        <div className="text-4xl font-bold mb-6 text-blue-400 font-mono">{plan.price}</div>
                        <ul className="space-y-4 text-gray-400 mb-8">
                            <li>✅ {plan.fee} Admin Fee</li>
                            <li>✅ {plan.support}</li>
                            <li>✅ {plan.limit}</li>
                        </ul>
                        <button className={`w-full py-3 rounded-xl font-bold transition ${index === 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}>
                            Choose Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// এই লাইনটি খুবই জরুরি, এটি না থাকলে আপনার এররটি আসবে
export default PricingPlans;