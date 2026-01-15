"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";

const addtask = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const task_title = form.task_title.value;
        const task_detail = form.task_detail.value;
        const required_workers = parseInt(form.required_workers.value);
        const payable_amount = parseFloat(form.payable_amount.value);
        const completion_date = form.completion_date.value;
        const submission_info = form.submission_info.value;
        const image = form.task_image.files[0];

        // ১. টোটাল কয়েন ক্যালকুলেট করা
        const total_payable_amount = required_workers * payable_amount;
        const available_coins = session?.user?.balance || 0;

        // ২. কয়েন চেক করা
        if (total_payable_amount > available_coins) {
            Swal.fire({
                title: "Not available Coin!",
                text: "Please purchase coins to post this task.",
                icon: "warning",
                confirmButtonText: "Purchase Coin",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/dashboard/purchase-coin"); // Purchase Page এ পাঠানো
                }
            });
            setLoading(false);
            return;
        }

        try {
            // ৩. ImgBB তে ইমেজ আপলোড করা
            const formData = new FormData();
            formData.append("image", image);
            const imgbbResponse = await axios.post(
                `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, // আপনার API Key দিন
                formData
            );
            const task_image_url = imgbbResponse.data.data.display_url;

            // ৪. টাস্ক ডাটা রেডি করা
            const taskData = {
                task_title,
                task_detail,
                required_workers,
                payable_amount,
                total_payable_amount,
                completion_date,
                submission_info,
                task_image_url,
                buyer_name: session?.user?.name,
                buyer_email: session?.user?.email,
                createdAt: new Date(),
            };

            // ৫. ডাটাবেজে সেভ করা এবং কয়েন কমানো (Backend API কল)
            const response = await fetch("http://localhost:5000/add-task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                Swal.fire("Success!", "Task added successfully.", "success");
                form.reset();
                router.push("/dashboard/my-campaigns"); // সাকসেস হলে রিডাইরেক্ট
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10">
            <h2 className="text-3xl font-black mb-6 text-slate-800 uppercase tracking-tight">Create New Task</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Task Title */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2">Task Title</label>
                    <input name="task_title" type="text" placeholder="ex: Watch my YouTube video" required className="w-full p-4 bg-slate-50 border rounded-xl outline-indigo-500" />
                </div>

                {/* Task Detail */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2">Task Detail</label>
                    <textarea name="task_detail" rows="4" placeholder="Describe the task in detail..." required className="w-full p-4 bg-slate-50 border rounded-xl outline-indigo-500"></textarea>
                </div>

                {/* Required Workers */}
                <div>
                    <label className="block text-sm font-bold mb-2">Required Workers</label>
                    <input name="required_workers" type="number" placeholder="100" required className="w-full p-4 bg-slate-50 border rounded-xl outline-indigo-500" />
                </div>

                {/* Payable Amount */}
                <div>
                    <label className="block text-sm font-bold mb-2">Payable Amount (Per Worker)</label>
                    <input name="payable_amount" type="number" placeholder="10" required className="w-full p-4 bg-slate-50 border rounded-xl outline-indigo-500" />
                </div>

                {/* Completion Date */}
                <div>
                    <label className="block text-sm font-bold mb-2">Completion Date</label>
                    <input name="completion_date" type="date" required className="w-full p-4 bg-slate-50 border rounded-xl outline-indigo-500" />
                </div>

                {/* Submission Info */}
                <div>
                    <label className="block text-sm font-bold mb-2">Submission Proof Info</label>
                    <input name="submission_info" type="text" placeholder="ex: Screenshot of comment" required className="w-full p-4 bg-slate-50 border rounded-xl outline-indigo-500" />
                </div>

                {/* Task Image */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2">Task Image</label>
                    <input name="task_image" type="file" accept="image/*" required className="w-full p-3 bg-slate-50 border rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-5 rounded-2xl font-black text-lg transition-all shadow-xl uppercase tracking-wider"
                    >
                        {loading ? "Adding Task..." : "Add Task"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default addtask;