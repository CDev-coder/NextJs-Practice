"use client";

import Link from "next/link";
import Image from "next/image";
import { CartItem, useCart } from "../../context/CartContext";

export default function CartCard({ product }: { product: CartItem }) {
  const { removeItem } = useCart();

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    removeItem(product.SKU);
  };

  const handleSaveForLater = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Saved ${product.name} for later`);
  };

  return (
    <div className="cartCardDiv bg-cart-card border rounded-[2rem] flex flex-col  p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-6 border-b border-dashed border-stone-200 last:border-0">
        {/* Product image */}
        <Link href={`/products/${product.id}`} className="shrink-0 group">
          <div className="overflow-hidden rounded-2xl border border-orange-100/50 shadow-sm">
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
              <h3 className="text-lg font-bold text-stone-800 hover:text-[#C27E6F] transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm">
              <p className="text-stone-400">
                Brand:{" "}
                <span className="text-stone-600 font-medium">
                  {product.brand}
                </span>
              </p>
              <p className="text-stone-400">
                Category:{" "}
                <span className="text-stone-600 font-medium">
                  {product.category}
                </span>
              </p>
            </div>

            <div className="flex gap-6 mt-4">
              <button
                onClick={handleRemove}
                className="text-stone-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Remove
              </button>
              <button
                onClick={handleSaveForLater}
                className="text-stone-400 hover:text-[#C27E6F] text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Save for later
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="text-right sm:min-w-[100px] flex flex-col justify-center">
            <span className="text-xl font-bold text-[#2D4F40]">
              ${product.price.toFixed(2)}
            </span>
            {product.quantity > 1 && (
              <p className="text-xs font-medium text-stone-400 mt-1 uppercase tracking-tighter">
                Qty: {product.quantity}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
