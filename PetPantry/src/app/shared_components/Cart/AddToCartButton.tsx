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
      className={`mt-4 bg-btn-primary text-white px-4 py-2 rounded hover:bg-btn-primary-hover ${className}`}
    >
      Add to Cart
    </button>
  );
}
