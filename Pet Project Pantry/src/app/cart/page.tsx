"use client";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
export default function CartPage() {
  const { clearCart } = useCart();
  const router = useRouter();
  // For now, no state management. Later you can use Context, Zustand, or Redux.
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <p>No items yet. Start shopping!</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => clearCart()}
      >
        Clear Cart
      </button>
      <button
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        onClick={() => router.back()} // <-- go back
      >
        Back
      </button>
    </div>
  );
}
