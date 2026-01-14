// src/app/page.tsx
"use client";

import HomePageShowcase from "./components/HomePageShowcase";
import { useProducts } from "@/hooks/useProducts";
export default function HomePage() {
  ///Discover by Collection
  const { products, loading } = useProducts();

  if (loading) return <p className="p-6 text-center">Loading products...</p>;
  return (
    <div className="HomePage bg-(--background)">
      <HomePageShowcase products={products} />
    </div>
  );
}
