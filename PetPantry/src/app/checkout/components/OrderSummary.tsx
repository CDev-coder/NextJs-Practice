interface OrderSummaryProps {
  itemPrices: number;
}

const OrderSummary = ({ itemPrices }: OrderSummaryProps) => {
  console.log("OrderSummary itemPrices:", itemPrices);

  const shippingCost = 5.99;
  const orderTotal = itemPrices + shippingCost;

  return (
    <aside className="border rounded p-4 h-fit">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2 text-sm bg-review-card p-4 rounded">
        <div className="flex justify-between">
          <span>Items</span>
          <span>${itemPrices.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-semibold border-t pt-2">
          <span>Order Total</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded">
        Place your order
      </button>
      <span className="text-sm">
        By placing your order, you agree to Pet Pantry&apos;s privacy notice and
        conditions of use.
      </span>
    </aside>
  );
};
export default OrderSummary;
