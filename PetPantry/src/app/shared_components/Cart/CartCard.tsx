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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 py-4">
      {/* Product image */}
      <Link href={`/products/${product.id}`} className="shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          width={120}
          height={120}
          className="rounded-md object-cover"
        />
      </Link>

      {/* Product details */}
      <div className="flex flex-col sm:flex-row justify-between flex-grow gap-4 w-full">
        <div className="flex flex-col flex-grow">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-blue-600 hover:underline">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            Brand: <span className="text-gray-700">{product.brand}</span>
          </p>
          <p className="text-sm text-gray-500">
            Category: <span className="text-gray-700">{product.category}</span>
          </p>

          <div className="flex gap-4 mt-3">
            <button
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
            <button
              onClick={handleSaveForLater}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Save for later
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="text-right sm:min-w-[80px]">
          <span className="text-lg font-semibold text-green-700">
            ${product.price.toFixed(2)}
          </span>
          {product.quantity > 1 && (
            <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
          )}
        </div>
      </div>
    </div>
  );
}
