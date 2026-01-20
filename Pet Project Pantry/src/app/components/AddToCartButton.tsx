"use client";

import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types";

export default function AddToCartButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${className}`}
    >
      Add to Cart
    </button>
  );
}
