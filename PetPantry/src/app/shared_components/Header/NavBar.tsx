import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import CartIcon from "../Cart/CartIcon";
import SearchBar from "./SearchBar";

interface NavBarProps {
  onHomeClick?: () => void;
}

export default function NavBar({ onHomeClick }: NavBarProps) {
  const { user, setUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (onHomeClick) {
      e.preventDefault();
      onHomeClick();
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleLogout = () => {
    setUser(null);
    closeDropdown();
    router.push("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 shadow text-black gap-3 sm:gap-0 relative z-50">
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
        <SearchBar />
      </div>

      {/* Right: Cart / Account */}
      <nav className="flex gap-4 items-center text-black justify-end">
        <Link href="/cart" className="flex items-center gap-1 relative">
          <span className="hidden sm:inline">Cart</span>
          <CartIcon size={80} />
        </Link>

        {/* Account Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 hover:text-gray-600 focus:outline-none"
          >
            Account
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
              {user ? (
                <>
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        {user.name || user.email}
                      </Link>
                    </p>
                  </div>
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/account/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Settings
                  </Link>
                  <Link
                    href="/account/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/account/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Settings
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
