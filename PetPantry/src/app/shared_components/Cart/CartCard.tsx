"use client";

import Link from "next/link";
import Image from "next/image";
import { CartItem, useCart } from "../../context/CartContext";

export default function CartCard({
  product,
  adjustQuantity = false,
}: {
  product: CartItem;
  adjustQuantity?: boolean;
}) {
  const { removeItem, updateItemQuantity } = useCart();

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    removeItem(product.SKU);
  };

  const handleQuantityChange = (e: React.MouseEvent, newQuantity: number) => {
    e.preventDefault();
    // Logic: If user decrements below 1, remove the item entirely
    if (newQuantity < 1) {
      removeItem(product.SKU);
    } else {
      updateItemQuantity(product.SKU, newQuantity);
    }
  };

  const handleSaveForLater = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Saved ${product.name} for later`);
  };

  return (
    <div className="cartCardDiv bg-cart-card border border-orange-100/50 rounded-[2rem] flex flex-col p-6 shadow-sm mb-4 transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Product image */}
        <Link href={`/products/${product.id}`} className="shrink-0 group">
          <div className="overflow-hidden rounded-2xl border border-orange-100/30 shadow-sm bg-white">
            <Image
              src={product.image}
              alt={product.name}
              width={110}
              height={110}
              className="object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </Link>

        {/* Product details */}
        <div className="flex flex-col sm:flex-row justify-between flex-grow gap-4 w-full">
          <div className="flex flex-col flex-grow">
            <Link href={`/products/${product.id}`}>
              <h3 className="text-lg font-bold text-stone-800 hover:text-navbar transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm">
              <p className="text-sofwords-secondary">
                Brand:{" "}
                <span className="text-stone-600 font-medium">
                  {product.brand}
                </span>
              </p>
              <p className="text-sofwords-secondary">
                Category:{" "}
                <span className="text-stone-600 font-medium">
                  {product.category}
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleRemove}
                className="px-4 py-1 border border-dashed border-cart-card-buttonborder rounded-full text-stone-400 text-[10px] font-black uppercase tracking-widest transition-all hover:text-error hover:border-error hover:bg-orange-50 active:scale-95"
              >
                Remove
              </button>
              <button
                onClick={handleSaveForLater}
                className="px-4 py-1 border border-dashed border-cart-card-buttonborder rounded-full text-stone-400 text-[10px] font-black uppercase tracking-widest transition-all hover:text-navbar hover:border-navbar hover:bg-orange-50 active:scale-95"
              >
                Save for later
              </button>
            </div>
          </div>

          {/* Price & Stepper */}
          <div className="flex flex-col items-end justify-center gap-3 sm:min-w-[120px]">
            <span className="text-xl font-bold text-stone-800">
              ${(product.price * product.quantity).toFixed(2)}
            </span>

            {adjustQuantity ? (
              /* Stylized Stepper Container */
              <div className="flex items-center bg-white border border-stone-200 rounded-full p-1 shadow-inner">
                <button
                  aria-label="Decrease quantity"
                  onClick={(e) => handleQuantityChange(e, product.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:bg-orange-50 hover:text-navbar transition-colors font-bold text-lg"
                >
                  −
                </button>

                <span className="px-3 min-w-[32px] text-center font-bold text-stone-700 text-sm">
                  {product.quantity}
                </span>

                <button
                  aria-label="Increase quantity"
                  onClick={(e) => handleQuantityChange(e, product.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:bg-orange-50 hover:text-navbar transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
            ) : (
              <p className="text-xs font-bold text-stone-400 uppercase tracking-tighter">
                Qty: {product.quantity}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
