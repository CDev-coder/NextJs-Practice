//src/app/shop/ShopClient.tsx
"use client";

import { useEffect } from "react";
import HomePageMenu from "@/app/components/HomePageMenu";
import { useFilters } from "@/app/context/FilterContext";
import { normalizeSubcategory } from "@/app/context/normalizer";
import { Product } from "@/app/types";

interface Props {
  products: Product[];
  params: { animal: string; category: string; subcategory: string };
}

export default function ShopClient({ products, params }: Props) {
  const { applyFilter } = useFilters();

  useEffect(() => {
    const { animal, category, subcategory } = params;
    const normalizedSubcategory =
      subcategory !== "all" ? normalizeSubcategory(subcategory) : "all";
    applyFilter(category, animal, normalizedSubcategory);
  }, [params, applyFilter]); // Removed applyFilter if it's stable; add back if needed

  return <HomePageMenu products={products} />;
}
