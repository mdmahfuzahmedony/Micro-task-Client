"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CheckoutForm = ({ price, coins, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  // ১. পেমেন্ট ইনটেন্ট তৈরি করার জন্য ব্যাকএন্ডে কল করা
  useEffect(() => {
    if (price > 0) {
      axios
        .post(
          "https://micro-task-server-nine.vercel.appcreate-payment-intent",
          { price }
        )
        .then((res) => {
          setClientSecret(res.data.clientSecret);
          console.log("Client Secret Received:", res.data.clientSecret); // এই লাইনটি যোগ করুন
        });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    setProcessing(true);

    // ২. পেমেন্ট কনফার্ম করা
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      Swal.fire("Error", error.message, "error");
      setProcessing(false);
    } else {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: userEmail || "anonymous",
            },
          },
        });

      if (confirmError) {
        Swal.fire("Error", confirmError.message, "error");
        setProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        // ৩. পেমেন্ট সফল হলে ব্যাকএন্ডে ডাটা পাঠানো
        const paymentInfo = {
          email: userEmail,
          transactionId: paymentIntent.id,
          price: price,
          coins: coins,
        };

        const res = await axios.post(
          "https://micro-task-server-nine.vercel.apppayments",
          paymentInfo
        );

        if (res.data.paymentResult.insertedId) {
          Swal.fire(
            "Success!",
            `Payment Successful. Transaction ID: ${paymentIntent.id}`,
            "success"
          );
          router.push("/dashboard/payment-history"); // পেমেন্ট হিস্ট্রি পেজে পাঠাবে
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="p-4 border rounded-xl bg-white dark:bg-slate-700">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#fafafa" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-6 rounded-xl font-bold"
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
