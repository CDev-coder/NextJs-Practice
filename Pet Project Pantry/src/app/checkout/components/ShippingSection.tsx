import { User } from "@/app/login/auth";

interface ShippingSectionProps {
  user: User;
}

const ShippingSection = ({ user }: ShippingSectionProps) => {
  console.log("ShippingSection user:", user);
  return (
    <section className="border rounded p-4">
      <h2 className="text-xl font-semibold mb-2">1. Shipping Address</h2>
      <p className="text-sm text-gray-600 mb-3">Delivery to {user.name}</p>

      {user.address ? (
        <p className="text-sm text-gray-600 mb-3">
          {user.address.city}, {user.address.state} {user.address.zip}
        </p>
      ) : (
        <p className="text-sm text-gray-600 mb-3">No address selected</p>
      )}

      <button className="text-blue-600 underline">Add a new address</button>
    </section>
  );
};
export default ShippingSection;
