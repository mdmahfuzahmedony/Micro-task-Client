const Advertise = () => {
    return (
        <div className="bg-[#0a192f] min-h-screen text-white p-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-10 rounded-3xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Promote Your Task</h2>
                    <p className="text-blue-100 max-w-xl mx-auto">Get 10x more workers by featuring your task on our home page sidebar or header banner.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="bg-[#112240] p-6 rounded-2xl border border-gray-800">
                        <h3 className="text-xl font-bold mb-2">Featured Task Slot</h3>
                        <p className="text-gray-400 mb-4">Your task will stay at the top of the "Available Tasks" list for 24 hours.</p>
                        <div className="text-2xl font-bold text-blue-400 mb-4">500 Coins / Day</div>
                        <button className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition">Book Slot</button>
                    </div>

                    <div className="bg-[#112240] p-6 rounded-2xl border border-gray-800">
                        <h3 className="text-xl font-bold mb-2">Sidebar Banner</h3>
                        <p className="text-gray-400 mb-4">Display your 300x250 banner ad to all users on their dashboard.</p>
                        <div className="text-2xl font-bold text-blue-400 mb-4">1,200 Coins / Week</div>
                        <button className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition">Upload Banner</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Advertise;