"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/login/auth";
import { useCart } from "@/app/context/CartContext";
import { useUser } from "@/app/context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { mergeCartOnLogin } = useCart();
  const { setUser } = useUser();

  // Get redirect query (optional)
  const searchParams = new URLSearchParams(window.location.search);
  const redirect = searchParams.get("redirect") || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await login({ email, password });
      if (!user?.id) throw new Error("Login failed");

      setUser(user);
      await mergeCartOnLogin(user.id);

      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto p-6 border rounded-lg shadow bg-white"
    >
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

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
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
