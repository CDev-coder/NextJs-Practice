"use client";
import { useCart } from "../context/CartContext";

export default function AccountPage() {
  const { clearCart } = useCart();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <p>Order history, profile settings, etc. will go here.</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => clearCart()}
          className="text-sm text-gray-500 hover:text-red-600 underline"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
