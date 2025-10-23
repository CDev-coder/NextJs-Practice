//import { products } from "./lib/products";
"use client";
import HomePageMenu from "./components/HomePageMenu";
import { useProducts } from "@/hooks/useProducts";
export default function HomePage() {
  ///Discover by Collection
  const { products, loading } = useProducts();

  if (loading) return <p className="p-6 text-center">Loading products...</p>;
  return (
    <div className="HomePage bg-[var(--background)]">
      <HomePageMenu products={products} />
    </div>
  );
}
