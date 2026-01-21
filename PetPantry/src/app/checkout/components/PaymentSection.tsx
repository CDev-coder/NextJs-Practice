import { User } from "@/app/login/auth";

interface PaymentSectionProps {
  user: User;
}

const PaymentSection = ({ user }: PaymentSectionProps) => {
  return (
    <section className="border rounded p-4">
      <h2 className="text-xl font-semibold mb-2">2. Payment Method</h2>

      {user.address ? (
        <p className="text-sm text-gray-600 mb-3">
          {user.address.city}, {user.address.state} {user.address.zip}
        </p>
      ) : (
        <p className="text-sm text-gray-600 mb-3">No payment selected</p>
      )}

      <button className="text-blue-600 underline">Add payment method</button>
    </section>
  );
};
export default PaymentSection;
