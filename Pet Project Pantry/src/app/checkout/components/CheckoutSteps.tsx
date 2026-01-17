import { User } from "@/app/login/auth";
import PaymentSection from "./PaymentSection";
import ReviewItemsSection from "./ReviewItemsSection";
import ShippingSection from "./ShippingSection";
import { CartItem } from "@/app/context/CartContext";

interface CheckoutStepsProps {
  user: User;
  cart: CartItem[];
}

const CheckoutSteps = ({ user, cart }: CheckoutStepsProps) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <ShippingSection user={user} />
      <PaymentSection user={user} />
      <ReviewItemsSection cart={cart} />
    </div>
  );
};

export default CheckoutSteps;
