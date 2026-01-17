"use client";

import Link from "next/link";
import { useUser } from "@context/UserContext";
import CheckoutHeader from "./components/CheckoutHeader";
import CheckoutSteps from "./components/CheckoutSteps";
import OrderSummary from "./components/OrderSummary";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { user } = useUser();
  const { cart } = useCart();

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto mt-16 px-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="mb-4">You must be logged in to checkout.</p>
        <Link href="/login" className="text-blue-600 underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <CheckoutHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CheckoutSteps user={user} cart={cart} />
        <OrderSummary
          itemPrices={cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          )}
        />
      </div>
    </div>
  );
}
