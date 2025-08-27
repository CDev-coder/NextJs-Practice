import Link from "next/link";

export default function CheckoutPage() {
  // Later: redirect to /login if user is not authenticated
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p>You must be logged in to checkout.</p>
      <Link href="/login" className="text-blue-500 underline">
        Go to Login
      </Link>
    </div>
  );
}
