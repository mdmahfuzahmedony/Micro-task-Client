// "use client";
// import { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { useSession } from "next-auth/react";
// import CheckoutForm from "./CheckoutForm";

// const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY"); // আপনার Public Key দিন

// const PurchaseCoin = () => {
//     const { data: session } = useSession();
//     const [selectedPkg, setSelectedPkg] = useState(null);

//     const coinPackages = [
//         { coins: 10, price: 1 },
//         { coins: 150, price: 10 },
//         { coins: 500, price: 20 },
//         { coins: 1000, price: 35 },
//     ];

//     return (
//         <div className="p-8 max-w-6xl mx-auto">
//             <h2 className="text-3xl font-black text-center mb-10">Purchase Coins</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {coinPackages.map((pkg, idx) => (
//                     <div
//                         key={idx}
//                         onClick={() => setSelectedPkg(pkg)}
//                         className={`p-8 border-2 rounded-[2rem] text-center cursor-pointer transition-all hover:border-indigo-500 ${selectedPkg?.coins === pkg.coins ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}
//                     >
//                         <h3 className="text-2xl font-black">{pkg.coins} Coins</h3>
//                         <p className="text-3xl font-bold text-indigo-600 mt-4">${pkg.price}</p>
//                     </div>
//                 ))}
//             </div>

//             {/* পেমেন্ট সেকশন (যদি প্যাকেজ সিলেক্ট করা হয়) */}
//             {selectedPkg && (
//                 <div className="mt-12 max-w-md mx-auto bg-white p-6 rounded-3xl shadow-2xl border">
//                     <h3 className="text-xl font-bold mb-4 text-center">Complete your payment</h3>
//                     <Elements stripe={stripePromise}>
//                         <CheckoutForm
//                             price={selectedPkg.price}
//                             coins={selectedPkg.coins}
//                             userEmail={session?.user?.email}
//                             userName={session?.user?.name}
//                         />
//                     </Elements>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PurchaseCoin;