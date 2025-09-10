// components/NavBar.tsx
import Link from "next/link";
import Image from "next/image";

interface NavBarProps {
  onHomeClick?: () => void;
}

export default function NavBar({ onHomeClick }: NavBarProps) {
  const handleHomeClick = (e: React.MouseEvent) => {
    // If an onHomeClick handler is provided, use it
    if (onHomeClick) {
      e.preventDefault(); // Prevent default navigation
      onHomeClick(); // Call the provided handler
    }
    // If no handler is provided, the Link will work normally
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
      <nav className="flex gap-4 text-black">
        <Link href="/cart">Cart</Link>
        <Link href="/account">Account</Link>
      </nav>
    </header>
  );
}
