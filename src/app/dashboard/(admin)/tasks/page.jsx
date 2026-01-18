"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2, Loader2 } from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://micro-task-server-nine.vercel.app/all-tasks"
      );
      setTasks(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleDeleteTask = (id) => {
    Swal.fire({
      title: "Delete this task?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://micro-task-server-nine.vercel.apptasks/${id}`
          );
          setTasks(tasks.filter((task) => task._id !== id));
          Swal.fire("Deleted!", "Task removed from database.", "success");
        } catch (error) {
          Swal.fire("Error", "Could not delete task", "error");
        }
      }
    });
  };

  if (loading) return <Loader2 className="animate-spin mx-auto mt-10" />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tasks</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="p-4">Task Title</th>
              <th className="p-4">Buyer Email</th>
              <th className="p-4">Required Workers</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-slate-800">
                    {task.task_title}
                  </td>
                  <td className="p-4 text-gray-500">{task.buyer_email}</td>
                  <td className="p-4 text-center font-bold text-blue-600">
                    {task.required_workers}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-all"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
