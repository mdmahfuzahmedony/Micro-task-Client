import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";


export default function DashboardLayout({ children }) {
    // এখানে আপনার অ্যাথেনটিকেশন থেকে ইউজার ডাটা আসবে
    const user = {
        name: "Ariful Islam",
        role: "worker", // এটা worker, buyer অথবা admin হতে পারে
        image: "https://via.placeholder.com/40",
        coins: 1250
    };

    return (
        <div className="flex h-screen bg-[#f8fafc]">
            {/* 1. Sidebar (Navigation) */}
            <aside className="w-64 bg-[#1e293b] text-white hidden md:flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-slate-700">
                    LOGO
                </div>
                <Sidebar role={user.role} />
            </aside>

            {/* Right Side Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* 2. Header (Logo/User Info/Notification) */}
                <Header user={user} />

                {/* 3. Sections Based on Routes (Main Content) */}
                <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
                    {children}
                </main>

          
           
            </div>
        </div>
    );
}