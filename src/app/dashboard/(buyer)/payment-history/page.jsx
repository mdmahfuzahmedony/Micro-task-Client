"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { LuHistory, LuCoins, LuCircleCheck } from "react-icons/lu"; // আইকন ব্যবহারের জন্য (npm i react-icons)

const PaymentHistory = () => {
  const { data: session } = useSession();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get(
          `https://micro-task-server-nine.vercel.apppayment-history/${session?.user?.email}`
        )
        .then((res) => {
          setPayments(res.data);
          setLoading(false);
        });
    }
  }, [session]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        <p className="mt-4 font-medium text-slate-500 animate-pulse">
          Loading transaction records...
        </p>
      </div>
    );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <LuHistory className="text-indigo-600" />
              Payment{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                History
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Keep track of all your coin purchases and transactions.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl text-indigo-600">
              <LuCoins size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Orders
              </p>
              <p className="text-xl font-black text-slate-800 dark:text-white">
                {payments.length}
              </p>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                  <th className="px-6 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Coins
                  </th>
                  <th className="px-6 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-6 py-5 font-medium text-slate-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 border dark:border-slate-700">
                        {payment.transactionId}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600">
                          <LuCoins size={16} />
                        </div>
                        <span className="font-black text-slate-700 dark:text-slate-200">
                          {payment.coins}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-emerald-600 dark:text-emerald-400">
                      ${payment.price}
                    </td>
                    <td className="px-6 py-5 text-slate-500 dark:text-slate-400 text-sm">
                      {new Date(payment.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-500/20">
                        <LuCircleCheck size={14} /> Succeeded
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {payments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <LuHistory size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                No Transactions Yet
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                When you purchase coins, they will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
