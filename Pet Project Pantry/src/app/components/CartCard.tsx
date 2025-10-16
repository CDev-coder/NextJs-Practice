"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartCard({ product }: { product: any }) {
  const { removeItem } = useCart();

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    removeItem(product.SKU);
  };

  const handleSaveForLater = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Saved ${product.name} for later`);
    // Optionally handle saving for later logic
  };

  return (
    <div className="flex items-center border rounded-lg p-4 shadow hover:shadow-lg transition bg-white mb-3">
      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-col justify-between ml-4 flex-grow">
        {/* Product Name (linked) */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-blue-500 hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>
        {/* Price */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-green-700 font-medium">
            ${product.price.toFixed(2)}
          </span>
        </div>
        {/*Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSaveForLater}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Save for later
          </button>
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
