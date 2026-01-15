const BuyCoins = () => {
    return (
        <div className="bg-[#0a192f] min-h-screen text-white flex items-center justify-center p-6">
            <div className="bg-[#112240] p-8 rounded-2xl w-full max-w-md border border-gray-800">
                <h2 className="text-2xl font-bold text-center mb-6">Recharge Wallet</h2>
                <div className="space-y-4">
                    <div className="bg-[#0a192f] p-4 rounded-xl border border-gray-700 flex justify-between cursor-pointer hover:border-blue-500">
                        <span>🪙 1,000 Coins</span>
                        <span className="text-green-400">$1.00</span>
                    </div>
                    <div className="bg-[#0a192f] p-4 rounded-xl border border-blue-500 flex justify-between cursor-pointer">
                        <span>🪙 5,500 Coins (Bonus)</span>
                        <span className="text-green-400">$5.00</span>
                    </div>
                    <div className="bg-[#0a192f] p-4 rounded-xl border border-gray-700 flex justify-between cursor-pointer hover:border-blue-500">
                        <span>🪙 12,000 Coins (Bonus)</span>
                        <span className="text-green-400">$10.00</span>
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-xs text-gray-500 mb-2 text-center">Select Payment Method</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-white text-black p-2 rounded-lg font-bold">Stripe/Card</button>
                        <button className="bg-pink-600 text-white p-2 rounded-lg font-bold">bKash/Nagad</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyCoins;