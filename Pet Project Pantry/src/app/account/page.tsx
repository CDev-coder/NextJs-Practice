// app/account/page.tsx
import { redirect } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { getCurrentUser } from "../login/auth";

export default async function AccountPage() {
  const user = await getCurrentUser(); // fetch logged-in user
  if (!user) redirect("/login?redirect=/account"); // redirect if not logged in

  return <AccountPageClient user={user} />;
}

// Client component to use CartContext
const AccountPageClient: React.FC<{
  user: { id: string; name: string; email: string };
}> = ({ user }) => {
  const { cart, totalPrice } = useCart();

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="mb-6">Your account details:</p>
      <ul className="mb-6 list-disc ml-5">
        <li>Email: {user.email}</li>
        <li>User ID: {user.id}</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="border rounded p-4">
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name} × {item.quantity} — $
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
        </div>
      )}
    </section>
  );
};
