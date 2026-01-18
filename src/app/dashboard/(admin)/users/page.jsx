"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2, Loader2, Users as UsersIcon } from "lucide-react";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // আপনার সার্ভার ইউআরএল এখানে একবার ডিফাইন করুন
  const serverUrl = "https://micro-task-server-nine.vercel.app";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${serverUrl}/users`);
      console.log("Live Users Data:", res.data); // লাইভ ডাটা চেক করার জন্য
      
      // ডাটা যদি অ্যারে না হয়ে অবজেক্ট হয় তবে তা অ্যারেতে রূপান্তর
      const data = Array.isArray(res.data) ? res.data : [];
      setAllUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users", error);
      setLoading(false);
    }
  };

  const handleRemoveUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${serverUrl}/users/${id}`);
          setAllUsers(allUsers.filter((user) => user._id !== id));
          Swal.fire("Deleted!", "User has been removed.", "success");
        } catch (error) {
          Swal.fire("Error", "Could not delete user", "error");
        }
      }
    });
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      const res = await axios.patch(`${serverUrl}/users/role/${id}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: `User role changed to ${newRole}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
        fetchUsers(); 
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Loader2 className="animate-spin text-blue-500" size={48} />
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-500 rounded-2xl text-white shadow-lg shadow-blue-500/20">
            <UsersIcon size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Manage Users</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Monitor and control user access and permissions.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="p-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800">User Details</th>
                  <th className="p-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800">Email</th>
                  <th className="p-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800">Role</th>
                  <th className="p-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800">Balance</th>
                  <th className="p-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allUsers.length > 0 ? (
                  allUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={user.image || user.photo_url || "https://i.ibb.co/v3n50Sj/user.png"}
                            alt={user.name || user.display_name}
                            className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-100 dark:border-slate-700 shadow-sm"
                          />
                          <span className="font-bold text-slate-900 dark:text-slate-100">{user.name || user.display_name || "N/A"}</span>
                        </div>
                      </td>
                      <td className="p-6 text-slate-500 dark:text-slate-400 font-medium">{user.email || user.user_email || "N/A"}</td>
                      <td className="p-6">
                        <select
                          defaultValue={user.role}
                          onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                          className="p-2.5 w-full max-w-[130px] border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer shadow-sm"
                        >
                          <option value="admin">Admin</option>
                          <option value="buyer">Buyer</option>
                          <option value="worker">Worker</option>
                        </select>
                      </td>
                      <td className="p-6">
                         <div className="flex items-center gap-1 font-black text-amber-500 text-lg">
                            🪙 {user.balance !== undefined ? user.balance : (user.coin || 0)}
                         </div>
                      </td>
                      <td className="p-6 text-center">
                        <button
                          onClick={() => handleRemoveUser(user._id)}
                          className="p-3 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 transition-all shadow-sm active:scale-95 group"
                        >
                          <Trash2 size={20} className="group-hover:rotate-12 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-20 text-center text-slate-400 font-bold">
                      No users found on the live server.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;