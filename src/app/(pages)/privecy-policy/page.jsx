import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-[#0a192f] min-h-screen text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-[#112240] p-8 rounded-2xl shadow-xl border border-gray-800">

                {/* Header */}
                <div className="text-center mb-10 border-b border-gray-800 pb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
                    <p className="text-blue-400">Effective Date: October 2023</p>
                    <p className="mt-4 text-sm text-gray-500 max-w-lg mx-auto">
                        Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
                    </p>
                </div>

                <div className="space-y-10 text-sm md:text-base leading-relaxed">

                    {/* Section 1: Information We Collect */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                            <h2 className="text-2xl font-semibold text-white">1. Information We Collect</h2>
                        </div>
                        <div className="ml-6 space-y-3">
                            <p>When you register on our platform, we collect certain details to provide a secure experience:</p>
                            <ul className="list-disc ml-5 space-y-1">
                                <li><strong>Account Data:</strong> Name, Email address, and Profile details.</li>
                                <li><strong>Payment Information:</strong> bKash/Nagad/Bank numbers for processing withdrawals.</li>
                                <li><strong>Technical Data:</strong> IP address, browser type, and device information (to prevent fraud and multi-accounting).</li>
                                <li><strong>Task Data:</strong> Proofs, screenshots, and descriptions you upload for tasks.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 2: How We Use Your Information */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                            <h2 className="text-2xl font-semibold text-white">2. How We Use Your Information</h2>
                        </div>
                        <div className="ml-6 space-y-2">
                            <p>We use the collected data for the following purposes:</p>
                            <ul className="list-disc ml-5 space-y-1">
                                <li>To verify tasks and process your "Coin" earnings.</li>
                                <li>To process withdrawal requests securely.</li>
                                <li>To detect and prevent cheating, spam, and bot activities.</li>
                                <li>To send important updates regarding your account or platform changes.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3: Data Protection */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                            <h2 className="text-2xl font-semibold text-white">3. Data Security</h2>
                        </div>
                        <p className="ml-6">
                            We implement a variety of security measures to maintain the safety of your personal information. Your data is stored behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems. <strong>We never sell your personal data to third parties.</strong>
                        </p>
                    </section>

                    {/* Section 4: Cookies */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                            <h2 className="text-2xl font-semibold text-white">4. Cookies</h2>
                        </div>
                        <p className="ml-6">
                            Our website uses cookies to enhance your experience. Cookies help us remember your login session and understand your preferences based on previous or current site activity. You can choose to disable cookies through your browser settings.
                        </p>
                    </section>

                    {/* Section 5: Third-Party Links */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                            <h2 className="text-2xl font-semibold text-white">5. Third-Party Links</h2>
                        </div>
                        <p className="ml-6">
                            Since buyers post external tasks (e.g., YouTube, Facebook, or other websites), we are not responsible for the privacy practices of those external sites. Please be cautious when visiting third-party links.
                        </p>
                    </section>

                    {/* Section 6: User Rights */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="w-2 h-8 bg-blue-600 rounded-full mr-4"></div>
                            <h2 className="text-2xl font-semibold text-white">6. Your Rights</h2>
                        </div>
                        <p className="ml-6">
                            You have the right to access, correct, or delete your personal information. If you wish to close your account and remove your data from our servers, please contact our support team.
                        </p>
                    </section>

                </div>

                {/* Contact Footer */}
                <div className="mt-16 p-6 bg-[#0a192f] rounded-xl border border-blue-500/20 text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Have questions about our Policy?</h3>
                    <p className="text-gray-400 mb-4">Feel free to reach out to our support team.</p>
                    <a href="mailto:support@yourwebsite.com" className="text-blue-500 hover:underline font-medium">
                        support@yourwebsite.com
                    </a>
                </div>

            </div>

            {/* Copyright info */}
            <p className="text-center text-gray-600 text-xs mt-8">
                &copy; {new Date().getFullYear()} YourSiteName. All rights reserved.
            </p>
        </div>
    );
};

export default PrivacyPolicy;