import React from 'react';

const HowToEarn = () => {
    const steps = [
        { id: 1, title: "Select a Task", desc: "Browse the 'Browse Tasks' page and choose a task that you like.", icon: "🔍" },
        { id: 2, title: "Read Instructions", desc: "Carefully read what the buyer wants you to do. Follow every step.", icon: "📖" },
        { id: 3, title: "Submit Proof", desc: "After finishing the work, upload the required screenshot or text proof.", icon: "📤" },
        { id: 4, title: "Earn Coins", desc: "Once the buyer approves your work, coins will be added to your wallet.", icon: "💰" }
    ];

    return (
        <div className="bg-[#0a192f] min-h-screen text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-12 text-blue-400">Step-by-Step Guide for Workers</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    {steps.map(step => (
                        <div key={step.id} className="bg-[#112240] p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition">
                            <div className="text-4xl mb-4">{step.icon}</div>
                            <h3 className="text-xl font-bold mb-2">Step {step.id}: {step.title}</h3>
                            <p className="text-gray-400">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowToEarn;