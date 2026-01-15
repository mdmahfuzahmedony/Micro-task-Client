import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="bg-[#0a192f] min-h-screen text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-[#112240] p-8 rounded-2xl shadow-xl border border-gray-800">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-2 font-sans">Terms and Conditions</h1>
                    <p className="text-blue-400">Last Updated: October 2023</p>
                </div>

                <div className="space-y-8 text-sm md:text-base leading-relaxed font-sans">

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                            Account Eligibility & Security
                        </h2>
                        <div className="ml-11 space-y-2">
                            <p>To use our services, you must provide accurate and complete information when creating an account.</p>
                            <p className="text-red-400 font-medium underline">Important: Only ONE account is allowed per person/IP address. Creating multiple accounts will lead to a permanent ban of all associated accounts.</p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                            Rules for Workers
                        </h2>
                        <ul className="ml-11 list-disc space-y-2">
                            <li>Always read the buyer's instructions carefully before starting a task.</li>
                            <li>Submitting <strong>Fake Proofs</strong> (edited screenshots or incorrect text) is strictly prohibited.</li>
                            <li>Workers must not use <strong>VPNs or Proxies</strong> unless specifically requested by the buyer.</li>
                            <li>Spamming or submitting the same proof multiple times will result in account suspension.</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                            Rules for Buyers
                        </h2>
                        <ul className="ml-11 list-disc space-y-2">
                            <li>Buyers must not post tasks that involve illegal content, adult material, or scams.</li>
                            <li>You must review and approve/reject proofs within a reasonable timeframe (usually 24-72 hours).</li>
                            <li>If a worker completes a task correctly, the buyer <strong>must</strong> approve the payment. Unfair rejections may lead to buyer account restrictions.</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                            Coins and Withdrawals
                        </h2>
                        <p className="ml-11">
                            Earnings are accumulated in the form of 'Coins'. These coins can be converted into real currency.
                            Withdrawal requests are typically processed within 1 to 3 business days. Please ensure your payment details (e.g., bKash, Nagad, or Bank) are correct.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                            Account Termination
                        </h2>
                        <p className="ml-11">
                            We reserve the right to terminate or suspend any account that violates our policies, attempts to hack the system, or uses bots. In case of a ban due to cheating, any remaining balance will be forfeited.
                        </p>
                    </section>

                </div>

                {/* Footer Note */}
                <div className="mt-12 pt-6 border-t border-gray-800 text-center">
                    <p className="text-gray-500 italic">
                        By using our platform, you acknowledge that you have read and agree to these Terms.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full transition duration-300 shadow-lg">
                            I Agree
                        </button>
                        <button className="border border-gray-600 hover:bg-gray-800 text-gray-300 font-bold py-2 px-10 rounded-full transition duration-300">
                            Decline
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TermsAndConditions;