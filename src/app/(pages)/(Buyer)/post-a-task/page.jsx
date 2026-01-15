"use client"

import React, { useState } from 'react';

const PostTask = () => {
    return (
        <div className="bg-[#0a192f] min-h-screen text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto bg-[#112240] p-8 rounded-2xl shadow-2xl border border-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-blue-400">Post a New Task</h2>

                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Task Title</label>
                        <input type="text" className="w-full bg-[#0a192f] border border-gray-700 p-3 rounded-lg focus:border-blue-500 outline-none" placeholder="e.g. Subscribe to my channel and comment" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Category</label>
                            <select className="w-full bg-[#0a192f] border border-gray-700 p-3 rounded-lg">
                                <option>Social Media</option>
                                <option>YouTube</option>
                                <option>App Install</option>
                                <option>Sign Up</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Workers Needed</label>
                            <input type="number" className="w-full bg-[#0a192f] border border-gray-700 p-3 rounded-lg" placeholder="100" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Steps to Complete (Instructions)</label>
                        <textarea className="w-full bg-[#0a192f] border border-gray-700 p-3 rounded-lg h-32" placeholder="1. Go to link... 2. Watch video..."></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Required Proof (Screenshot/Text)</label>
                        <input type="text" className="w-full bg-[#0a192f] border border-gray-700 p-3 rounded-lg" placeholder="e.g. Upload screenshot of your subscription" />
                    </div>

                    <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-400 font-bold">Total Estimated Cost: 500 Coins</p>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition duration-300">Publish Task</button>
                </form>
            </div>
        </div>
    );
};

export default PostTask;