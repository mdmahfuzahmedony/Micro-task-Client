// src/components/AuthProvider.js
"use client"; // এটি অবশ্যই দিতে হবে

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
    return <SessionProvider>{children}</SessionProvider>;
}