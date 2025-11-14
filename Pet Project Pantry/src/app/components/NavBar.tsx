import Link from "next/link";
import Image from "next/image";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";

interface NavBarProps {
  onHomeClick?: () => void;
}

export default function NavBar({ onHomeClick }: NavBarProps) {
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
        <SearchBar />
      </div>

      {/* Right: Cart / Account */}
      <nav className="flex gap-4 items-center text-black justify-end">
        <Link href="/cart" className="flex items-center gap-1 relative">
          <span className="hidden sm:inline">Cart</span>
          <CartIcon size={80} />
        </Link>
        <Link href="/account">Account</Link>
      </nav>
    </header>
  );
}
