"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2"; // মিষ্টি অ্যালার্টের জন্য (npm i sweetalert2)
import axios from "axios";

const AddTask = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ইউজারের বর্তমান ব্যালেন্স (আপনার ইউজ সেশন বা আলাদা একটা হুক থেকে আনতে পারেন)
  // আমি ধরে নিচ্ছি আপনি এটি fetch করে নিচ্ছেন অথবা session এ আছে।
  const userBalance = session?.user?.balance || 100; // উদাহরণ হিসেবে ১০০

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const task_title = form.task_title.value;
    const task_detail = form.task_detail.value;
    const required_workers = parseInt(form.required_workers.value);
    const payable_amount = parseFloat(form.payable_amount.value);
    const completion_date = form.completion_date.value;
    const submission_info = form.submission_info.value;
    const imageFile = form.task_image.files[0];

    const total_payable_amount = required_workers * payable_amount;

    // ১. ব্যালেন্স চেক
    if (total_payable_amount > userBalance) {
      Swal.fire({
        icon: "error",
        title: "Not available Coin. Purchase Coin",
      });
      setLoading(false);
      router.push("/dashboard/purchase-coin"); // Purchase page এ পাঠানো
      return;
    }

    try {
      // ২. ImageBB তে ইমেজ আপলোড
      const formData = new FormData();
      formData.append("image", imageFile);
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, // আপনার কী দিন
        formData
      );
      const task_image_url = imgbbRes.data.data.display_url;

      // ৩. ডাটাবেসে পাঠানোর জন্য অবজেক্ট
      const taskData = {
        task_title,
        task_detail,
        required_workers,
        payable_amount,
        total_payable_amount,
        completion_date,
        submission_info,
        task_image_url,
        buyer_email: session?.user?.email,
        buyer_name: session?.user?.name,
      };

      // ৪. সার্ভারে ডাটা পাঠানো
      const response = await axios.post(
        "https://micro-task-server-nine.vercel.appadd-task",
        taskData
      );

      if (response.data.success) {
        Swal.fire("Success!", "Task Added Successfully", "success");
        form.reset();
        router.push("/dashboard/my-tasks");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white dark:bg-slate-800 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 text-center">
        Create a New Task
      </h2>

      <form
        onSubmit={handleAddTask}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Task Title */}
        <div className="form-control">
          <label className="label font-semibold dark:text-slate-200">
            Task Title
          </label>
          <input
            type="text"
            name="task_title"
            placeholder="Ex: Watch my video"
            className="input input-bordered dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        {/* Completion Date */}
        <div className="form-control">
          <label className="label font-semibold dark:text-slate-200">
            Completion Date
          </label>
          <input
            type="date"
            name="completion_date"
            className="input input-bordered dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        {/* Required Workers */}
        <div className="form-control">
          <label className="label font-semibold dark:text-slate-200">
            Required Workers
          </label>
          <input
            type="number"
            name="required_workers"
            placeholder="100"
            className="input input-bordered dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        {/* Payable Amount (per worker) */}
        <div className="form-control">
          <label className="label font-semibold dark:text-slate-200">
            Payable Amount (Per Worker)
          </label>
          <input
            type="number"
            step="0.01"
            name="payable_amount"
            placeholder="10"
            className="input input-bordered dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold dark:text-slate-200">
            Task Image
          </label>
          <input
            type="file"
            name="task_image"
            className="file-input file-input-bordered w-full dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        {/* Task Detail */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold dark:text-slate-200">
            Task Detail
          </label>
          <textarea
            name="task_detail"
            className="textarea textarea-bordered h-24 dark:bg-slate-700 dark:text-white"
            placeholder="Enter detail description..."
            required
          ></textarea>
        </div>

        {/* Submission Info */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold dark:text-slate-200">
            What to Submit (Proof)
          </label>
          <input
            type="text"
            name="submission_info"
            placeholder="Ex: Screenshot or Proof link"
            className="input input-bordered dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="form-control md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl font-bold text-lg ${
              loading ? "loading" : ""
            }`}
          >
            {loading ? "Adding Task..." : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
