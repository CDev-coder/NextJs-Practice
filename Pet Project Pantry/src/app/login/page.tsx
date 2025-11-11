"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mergeCartOnLogin } = useCart();
  const redirectTo = searchParams.get("redirect") || "/";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      // Mock login API call
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid login");

      const user = await res.json();
      const userId = user.id;

      // Merge guest cart with server cart
      await mergeCartOnLogin(userId);

      // Redirect to original page (or account)
      router.push(redirectTo);
    } catch (err) {
      console.error(err);
      alert("Login failed. Check your credentials.");
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto p-6 border rounded-lg shadow bg-white"
    >
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}
