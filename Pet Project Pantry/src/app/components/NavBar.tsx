// components/NavBar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

interface NavBarProps {
  onHomeClick?: () => void;
}

export default function NavBar({ onHomeClick }: NavBarProps) {
  const { cart } = useCart(); // <-- get cart from context

  // Calculate total items in cart
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (onHomeClick) {
      e.preventDefault();
      onHomeClick();
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow text-black">
      <Link
        href="/"
        className="flex items-center gap-2 text-xl font-bold"
        id="mainHeaderLink"
        onClick={handleHomeClick}
      >
        <span className="text-xl font-bold">Pet Pantry</span>
        <Image
          src="/icons/favicon-32x32.png"
          alt="Pet Pantry"
          width={32}
          height={32}
        />
      </Link>
      <nav className="flex gap-4 items-center text-black">
        <Link href="/cart" className="relative">
          Cart
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          )}
        </Link>
        <Link href="/account">Account</Link>
      </nav>
    </header>
  );
}
