import { CartItem } from "@/app/context/CartContext";

const PurchaseSection = ({ cart }: { cart: CartItem[] }) => {
  console.log("PurchaseSection cart:", cart);
  const shippingCost = 5.99;
  const orderTotal =
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    shippingCost;
  return (
    <section className="border rounded p-4">
      <h2 className="text-xl font-semibold mb-4">4. Purchase Items</h2>
      <div className="flex items-center justify-between border-b pb-3 mb-3 bg-white">
        <button className="w-40 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded">
          Place your order
        </button>
        <div className="flex justify-between font-semibold flex-1 ml-4">
          <span>Order Total:</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
};
export default PurchaseSection;
