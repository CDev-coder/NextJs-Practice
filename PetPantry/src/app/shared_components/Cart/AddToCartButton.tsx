"use client";

import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types";
import { useToast } from "@/app/context/ToastContext";

export default function AddToCartButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  return (
    <button
      onClick={() => {
        addItem(product);
        showToast(`Just added ${product.name}!`);
      }}
      className={`mt-4 bg-btn-primary text-white px-4 py-2 rounded hover:bg-btn-primary-hover ${className}`}
    >
      Add to Cart
    </button>
  );
}
