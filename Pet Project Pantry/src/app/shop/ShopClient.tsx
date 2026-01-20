//src/app/shop/ShopClient.tsx
"use client";

import { useEffect } from "react";
import HomePageMenu from "@/app/shared_components/HomePage/HomePageMenu";
import { useFilters } from "@/app/context/FilterContext";
import { normalizeSubcategory } from "@/app/context/helperFunctions";

interface Props {
  params: { animal: string; category: string; subcategory: string };
}

export default function ShopClient({ params }: Props) {
  const { applyFilter } = useFilters();

  useEffect(() => {
    const { animal, category, subcategory } = params;
    const normalizedSubcategory =
      subcategory !== "all" ? normalizeSubcategory(subcategory) : "all";
    applyFilter(category, animal, normalizedSubcategory);
  }, [params, applyFilter]); // Removed applyFilter if it's stable; add back if needed

  return <HomePageMenu />;
}
