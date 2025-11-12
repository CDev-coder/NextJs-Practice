"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/app/login/auth"; // You’ll create this similar to login()
import { useCart } from "@/app/context/CartContext";
import { useUser } from "@/app/context/UserContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { mergeCartOnLogin } = useCart();
  const { setUser } = useUser();

  // Redirect query (optional)
  const searchParams = new URLSearchParams(window.location.search);
  const redirect = searchParams.get("redirect") || "/";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const newUser = await register({ name, email, password });
      if (!newUser?.id) throw new Error("Registration failed");

      setUser(newUser);
      await mergeCartOnLogin(newUser.id);
      router.push(redirect);
    } catch (err) {
      setError("Failed to create account. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-sm mx-auto p-6 border rounded-lg shadow bg-white"
    >
      <h1 className="text-xl font-bold mb-4">Create an Account</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Full Name"
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
        disabled={loading}
        className={`w-full py-2 rounded ${
          loading
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {loading ? "Creating Account..." : "Register"}
      </button>
    </form>
  );
}
