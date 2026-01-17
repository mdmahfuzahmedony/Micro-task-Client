// constants/menuItems.js
export const menuItems = {
    worker: [
        { name: "Home", path: "/dashboard/WorkerHome", icon: "🏠" },
        { name: "TaskList", path: "/dashboard/task-list", icon: "📋" },
        { name: "My Submissions", path: "/dashboard/my-submissions", icon: "✅" },
        { name: "Withdrawals", path: "/dashboard/withdrawals", icon: "💰" },
    ],
    buyer: [
        { name: "Home", path: "/dashboard/ReviewTask", icon: "🏠" },
        { name: "Add New Tasks", path: "/dashboard/add-task", icon: "➕" },
        { name: "My Tasks", path: "/dashboard/my-tasks", icon: "📂" },
        { name: "Purchase Coin", path: "/dashboard/purchase-coin", icon: "🪙" },
        { name: "Payment History", path: "/dashboard/payment-history", icon: "📜" },
    ],
    admin: [
        { name: "Home", path: "/dashboard", icon: "🏠" },
        { name: "Manage Users", path: "/dashboard/users", icon: "👥" },
        { name: "Manage Tasks", path: "/dashboard/tasks", icon: "🛠️" },
    ],
};