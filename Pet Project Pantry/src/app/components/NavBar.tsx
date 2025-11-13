"use client";

import Link from "next/link";
import Image from "next/image";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";
import { useCart } from "@context/CartContext";

interface NavBarProps {
  onHomeClick?: () => void;
  onSearch?: (query: string) => void; // ✅ new prop
}

export default function NavBar({ onHomeClick, onSearch }: NavBarProps) {
  const { cart } = useCart();

  // Calculate total items in cart
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (onHomeClick) {
      e.preventDefault();
      onHomeClick();
    }
  };

  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-white shadow text-black gap-3 sm:gap-0">
      {/* Left: Logo / Home */}
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

      {/* Middle: Search bar */}
      <div className="flex-1 flex justify-center w-full sm:w-auto">
        <SearchBar onSearch={onSearch || (() => {})} />
      </div>

      {/* Right: Cart / Account */}
      <nav className="flex gap-4 items-center text-black justify-end">
        <Link href="/cart" className="flex items-center gap-1 relative">
          <span className="hidden sm:inline">Cart</span>
          <CartIcon size={80} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
              {cartItemCount}
            </span>
          )}
        </Link>
        <Link href="/account">Account</Link>
      </nav>
    </header>
  );
}
