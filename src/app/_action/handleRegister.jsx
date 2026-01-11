"use server"
import { redirect } from "next/navigation";

export async function handleRegister(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const role = formData.get('role');

    const userInfo = { name, email, password, role, balance: 0, createdAt: new Date() };

    try {
        const res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo),
            cache: 'no-store'
        });

        const data = await res.json();

        if (res.ok && data.insertedId) {
            // অ্যালার্ট দেখানোর জন্য আমরা ওই একই পেজে রিডাইরেক্ট করবো
            redirect("/register?success=Your account has been created!");
        } else {
            const msg = data.message || "Failed to register";
            redirect(`/register?error=${msg}`);
        }
    } catch (err) {
        redirect("/register?error=Backend server is not running!");
    }
}