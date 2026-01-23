import { useState } from "react";
import { User } from "@/app/login/auth";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface ShippingSectionProps {
  user: User & {
    address?: {
      // Note: singular "address", not "addresses"
      [key: string]: Address;
    };
  };
}

const ShippingSection = ({ user }: ShippingSectionProps) => {
  console.log("ShippingSection user:", user);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("primary");

  // Extract addresses from user.address (singular)
  const addresses = user?.address || {};
  console.log("All addresses from user.address:", addresses);

  // Get the current address based on selectedKey
  const currentAddress = addresses[selectedKey];
  console.log("Selected key:", selectedKey);
  console.log("Current address object:", currentAddress);

  return (
    <section className="shippingSection border rounded p-4">
      <h2 className="text-xl font-semibold mb-2">1. Shipping Address</h2>
      <div className="border-b pb-3 mb-3 px-5 bg-white shadow rounded-lg">
        <div className="shipping_user flex justify-between items-center mb-1">
          <h5 className="">Delivery to {user.name}</h5>
          <button
            className="text-blue-600 underline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Done" : "Change"}
          </button>
        </div>
        <div className="shippingAddressDiv">
          {isEditing ? (
            <div className="flex flex-col gap-2 mb-3">
              {Object.entries(addresses).map(
                ([key, addr]: [string, Address]) => (
                  <label
                    key={key}
                    className="flex items-start gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200"
                  >
                    <input
                      type="radio"
                      name="addressSelection"
                      value={key}
                      checked={selectedKey === key}
                      onChange={(e) => setSelectedKey(e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <span className="font-medium capitalize block text-sm">
                        {key}
                      </span>
                      <span className="text-sm text-gray-600">
                        {addr.street}, {addr.city}, {addr.state} {addr.zip}
                      </span>
                    </div>
                  </label>
                ),
              )}
            </div>
          ) : currentAddress ? (
            <div className="py-1">
              <p className="text-sm text-gray-600 mb-3">
                {currentAddress.street}, {currentAddress.city},
                {currentAddress.state} {currentAddress.zip}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600 mb-3">No address selected</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShippingSection;
