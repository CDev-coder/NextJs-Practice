"use client";

import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "../Cart/AddToCartButton";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  infoButton?: boolean;
  onInfoClick?: () => void;
}

export default function ProductCard({
  product,
  infoButton = false,
  onInfoClick,
}: ProductCardProps) {
  return (
    <div className="ProductCardDiv group relative overflow-hidden rounded-xl border border-input-border bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative mb-3 h-40 w-full overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={160}
            className="w-full h-40 object-cover rounded transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <span className="shrink-0 rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-700">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </Link>

      {/* Card buttons layout */}
      <div className="flex gap-2 mt-3">
        <AddToCartButton product={product} className="flex-1" />
        {infoButton && (
          <button
            className="mt-4 bg-btn-secondary border px-3 py-2 rounded-md text-sm font-medium transition hover:bg-gray-100 hover:bg-btn-secondary-hover focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={onInfoClick}
          >
            Info
          </button>
        )}
      </div>
    </div>
  );
}
