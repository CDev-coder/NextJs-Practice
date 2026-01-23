import { useState } from "react";
import { User } from "@/app/login/auth";

interface PaymentSectionProps {
  user: User & {
    paymentMethod?: {
      [key: string]: Record<string, unknown>;
    };
    paymentmethod?: {
      [key: string]: Record<string, unknown>;
    };
  };
}

const PaymentSection = ({ user }: PaymentSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const paymentMethods = user.paymentMethod || user.paymentmethod || {};
  // Default to first available method or empty string
  const [selectedKey, setSelectedKey] = useState<string>(
    Object.keys(paymentMethods)[0] || "",
  );

  const currentPayment = paymentMethods[selectedKey];
  console.log("Selected key:", selectedKey);
  console.log("Current payment object:", currentPayment);

  const renderPaymentDetails = (
    key: string,
    details: Record<string, unknown>,
  ) => {
    if (!details) return "";

    if (key === "creditcard") {
      return `Card ending in ${(details.number as string | undefined)?.slice(-4)} (Expires ${details.expiry as string | undefined})`;
    }
    if (key === "paypal") {
      return `${details.email as string}`;
    }
    if (key === "giftCard") {
      return `Balance: $${(details.balance as number | undefined)?.toFixed(2)} ${details.currency as string | undefined}`;
    }
    return "Details available";
  };

  const getLabel = (key: string) => {
    if (key === "creditcard") return "Credit Card";
    if (key === "giftCard") return "Gift Card";
    if (key === "paypal") return "PayPal";
    return key; // paypal
  };

  return (
    <section className="border rounded p-4">
      <h2 className="text-xl font-semibold mb-2">2. Payment Method</h2>
      <div className="border-b pb-3 mb-3 px-5 bg-white shadow rounded-lg">
        <div className="flex justify-between items-center mb-1">
          <h5 className="">Paying with {getLabel(selectedKey)}</h5>
          <button
            className="text-blue-600 underline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Done" : "Change"}
          </button>
        </div>
        <div className="paymentMethodDiv">
          {isEditing ? (
            <div className="flex flex-col gap-2 mb-3">
              {Object.entries(paymentMethods).map(([key, details]) => (
                <label
                  key={key}
                  className="flex items-start gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200"
                >
                  <input
                    type="radio"
                    name="paymentSelection"
                    value={key}
                    checked={selectedKey === key}
                    onChange={(e) => setSelectedKey(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium capitalize block text-sm">
                      {getLabel(key)}
                    </span>
                    <span className="text-sm text-gray-600">
                      {renderPaymentDetails(key, details)}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          ) : currentPayment ? (
            <div className="py-1">
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium capitalize mr-2">
                  {getLabel(selectedKey)}:
                </span>
                {renderPaymentDetails(selectedKey, currentPayment)}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600 mb-3">
              No payment method selected
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
export default PaymentSection;
