import React from 'react';

const TopEarners = () => {
    const earners = [
        { rank: 1, name: "Ariful Islam", tasks: 1240, coins: "52,000" },
        { rank: 2, name: "Sumaiya Akter", tasks: 980, coins: "41,500" },
        { rank: 3, name: "Rakib Hasan", tasks: 850, coins: "35,200" },
        { rank: 4, name: "Tariqul Dev", tasks: 720, coins: "28,000" },
        { rank: 5, name: "Anika Mim", tasks: 600, coins: "22,500" },
    ];

    return (
        <div className="bg-[#0a192f] min-h-screen text-white p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-yellow-500">🏆 Top Earners Leaderboard</h1>
                <div className="bg-[#112240] rounded-2xl overflow-hidden border border-gray-800">
                    <table className="w-full text-left">
                        <thead className="bg-[#1d2d44] text-gray-300">
                            <tr>
                                <th className="p-4">Rank</th>
                                <th className="p-4">User Name</th>
                                <th className="p-4">Tasks Done</th>
                                <th className="p-4">Total Coins</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earners.map((user) => (
                                <tr key={user.rank} className="border-b border-gray-800 hover:bg-blue-900/20 transition">
                                    <td className="p-4 font-bold">{user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : user.rank}</td>
                                    <td className="p-4">{user.name}</td>
                                    <td className="p-4 text-gray-400">{user.tasks}</td>
                                    <td className="p-4 text-green-400 font-bold">{user.coins}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopEarners;