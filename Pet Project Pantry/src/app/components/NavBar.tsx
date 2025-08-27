import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow text-black">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
        <span className="text-xl font-bold">Pet Project Pantry</span>
        <Image
          src="/icons/favicon-32x32.png"
          alt="Pet Project Pantry"
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
