import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";

const CheckoutForm = ({ price, coins, userEmail, userName }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);
        const card = elements.getElement(CardElement);

        // ১. পেমেন্ট ইনটেন্ট কল করা
        const { data } = await axios.post("http://localhost:5000/create-payment-intent", { price });
        const clientSecret = data.clientSecret;

        // ২. পেমেন্ট কনফার্ম করা
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: card, billing_details: { name: userName, email: userEmail } },
        });

        if (error) {
            Swal.fire("Error", error.message, "error");
            setProcessing(false);
        } else if (paymentIntent.status === "succeeded") {
            // ৩. ডাটাবেজে সেভ করা
            const paymentInfo = {
                email: userEmail,
                transactionId: paymentIntent.id,
                price,
                coins,
                date: new Date(),
            };
            await fetch("http://localhost:5000/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentInfo),
            });

            Swal.fire("Success", "Payment Successful! Coins added.", "success");
            window.location.reload();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-slate-50 rounded-xl">
            <CardElement className="p-3 border rounded-lg bg-white" />
            <button type="submit" disabled={!stripe || processing} className="btn btn-primary w-full mt-4">
                {processing ? "Processing..." : `Pay $${price}`}
            </button>
        </form>
    );
};