// app/account/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useUser } from "@/app/context/UserContext";

export default function AccountPage() {
  const { user } = useUser();
  const router = useRouter();
  const { cart, totalPrice } = useCart();

  // Redirect guest users
  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/account");
    }
  }, [user, router]);

  if (!user) return <p>Redirecting to login...</p>;
  console.log("USER:", user);
  return (
    <section className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-card-title">
            Welcome, {user.name}
          </h1>
          <p className="text-card-subtext">
            Manage your account and preferences
          </p>
        </div>
        <Link
          href="/account/settings"
          className="flex items-center gap-2 bg-btn-primary text-navbar-text px-4 py-3 rounded-lg hover:bg-btn-primary-hover transition-colors shadow-md"
        >
          <span className="text-xl">⚙️</span>
          Settings
        </Link>
      </div>

      {/* Quick Settings Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link
          href="/account/settings"
          className="bg-card border border-divider rounded-xl p-5 hover:shadow-card transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-btn-primary/10 rounded-lg">
              <span className="text-xl">🎨</span>
            </div>
            <h3 className="font-semibold text-card-title">Appearance</h3>
          </div>
          <p className="text-sm text-card-subtext">
            Theme, colors, and display settings
          </p>
        </Link>

        <Link
          href="/account/settings#notifications"
          className="bg-card border border-divider rounded-xl p-5 hover:shadow-card transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <span className="text-xl">🔔</span>
            </div>
            <h3 className="font-semibold text-card-title">Notifications</h3>
          </div>
          <p className="text-sm text-card-subtext">
            Email and push notifications
          </p>
        </Link>

        <Link
          href="/account/orders"
          className="bg-card border border-divider rounded-xl p-5 hover:shadow-card transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <span className="text-xl">📦</span>
            </div>
            <h3 className="font-semibold text-card-title">Order History</h3>
          </div>
          <p className="text-sm text-card-subtext">
            View and manage your orders
          </p>
        </Link>
      </div>

      {/* Original Account Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border-cborder border rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-bold mb-4 text-card-title">
            Account Details
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-card-subtext mb-1">Email</p>
              <p className="font-medium text-sofwords">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-card-subtext mb-1">User ID</p>
              <p className="font-medium text-sofwords">{user.id}</p>
            </div>
            <div>
              <p className="text-sm text-card-subtext mb-1">Address</p>
              <p className="font-medium text-sofwords">
                {user.addresses
                  ? `${user.addresses.primary.street}, ${user.addresses.primary.city}`
                  : "No address provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border-cborder border rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-bold mb-4 text-card-title">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-card-subtext">Your cart is empty.</p>
          ) : (
            <div>
              <ul className="mb-6 space-y-3">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center pb-3 border-b border-divider"
                  >
                    <div>
                      <p className="font-medium text-card-title">{item.name}</p>
                      <p className="text-sm text-card-subtext">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-sofwords">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center pt-4 border-t border-divider">
                <span className="font-bold text-lg text-card-title">Total</span>
                <span className="font-bold text-xl text-btn-primary">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
