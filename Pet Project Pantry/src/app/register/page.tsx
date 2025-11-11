"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../login/auth";
import { useCart } from "@/app/context/CartContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { mergeCartOnLogin } = useCart();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const user = await register(name, email, password);

      // Merge guest cart into server/dev cart
      await mergeCartOnLogin(user.id);

      // Redirect to intended page (or home)
      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    } catch (err) {
      setError("Failed to register. Email may already exist.");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-sm mx-auto p-6 border rounded-lg shadow bg-white"
    >
      <h1 className="text-xl font-bold mb-4">Create Account</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Register
      </button>
    </form>
  );
}
