import CartCard from "@/app/components/CartCard";
import { CartItem } from "@/app/context/CartContext";

const ReviewItemsSection = ({ cart }: { cart: CartItem[] }) => {
  console.log("ReviewItemsSection cart:", cart);
  return (
    <section className="border rounded p-4">
      <h2 className="text-xl font-semibold mb-4">3. Review Items</h2>
      <div className="flex justify-between border-b pb-3 mb-3  bg-white shadow rounded-lg">
        <div className="divide-y divide-gray-200">
          {cart.map((item) => (
            <CartCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default ReviewItemsSection; //
