// components/ProductBreadcrumb.tsx
"use client";

import Link from "next/link";
import { Product } from "@/app/types";
import { capitalizeFirst } from "@/app/context/helperFunctions";
import { useFilters } from "@/app/context/FilterContext";
import { useRouter } from "next/navigation";

interface ProductBreadcrumbProps {
  product: Product;
}

export default function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const { applyFilter } = useFilters();
  const router = useRouter();

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <Link href="/" className="hover:text-black">
        All Products
      </Link>
      <span className="mx-1">/</span>
      {/* CATEGORY: apply filter and navigate to shop route */}
      <Link
        href={`/shop/${encodeURIComponent(product.category)}`}
        className="hover:text-black"
      >
        {capitalizeFirst(product.category)}
      </Link>
      <span className="mx-1">/</span>
      <Link
        href={`/shop/${encodeURIComponent(
          product.category
        )}/${encodeURIComponent(product.animal)}`}
      >
        {capitalizeFirst(product.animal)}
      </Link>
      <span className="mx-1">/</span>
      <Link
        href={`/shop/${encodeURIComponent(
          product.category
        )}/${encodeURIComponent(product.animal)}/${encodeURIComponent(
          product.subcategory
        )}`}
        className="hover:text-black"
        onClick={() =>
          applyFilter(product.category, product.animal, product.subcategory)
        }
      >
        {capitalizeFirst(product.subcategory)}
      </Link>
      <span className="mx-1">/</span>
      <span className="text-gray-900 font-medium">{product.name}</span>
    </nav>
  );
}
