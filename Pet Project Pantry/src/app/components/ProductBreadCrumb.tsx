// components/ProductBreadcrumb.tsx
"use client";

import Link from "next/link";
import { Product } from "@/app/types";
import { capitalizeFirst } from "@/app/context/helperFunctions";
import { useFilters } from "@/app/context/FilterContext";

interface ProductBreadcrumbProps {
  product: Product;
}

export default function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const { applyFilter, activeFilters } = useFilters();
  return (
    <nav className="text-sm text-gray-600 mb-4">
      <Link href="/" className="hover:text-black">
        All Products
      </Link>
      <span className="mx-1">/</span>
      {/* CATEGORY */}

      <span
        onClick={() => {
          console.log(
            "CATEGORY CLICK CATE: " +
              product.category +
              " Animal: " +
              product.animal +
              " subcategory: " +
              product.subcategory
          );
          applyFilter(product.category, product.animal, product.subcategory);
        }}
        className="cursor-pointer text-blue-500"
      >
        {capitalizeFirst(product.category)}
      </span>

      <span className="mx-1">/</span>
      <Link
        href={`/?category=${product.category.toLowerCase()}&animal=${product.animal.toLowerCase()}`}
        className="hover:text-black"
      >
        {capitalizeFirst(product.animal)}
      </Link>
      <span className="mx-1">/</span>
      <Link
        href={`/?category=${product.category.toLowerCase()}&animal=${product.animal.toLowerCase()}&subcategory=${product.subcategory.toLowerCase()}`}
        className="hover:text-black"
      >
        {capitalizeFirst(product.subcategory)}
      </Link>
      <span className="mx-1">/</span>
      <span className="text-gray-900 font-medium">{product.name}</span>
    </nav>
  );
}
