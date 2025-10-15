import { Product } from "@/app/types";
import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        ///const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);//If you’re fetching from a different port (e.g. your Next.js dev server vs. backend API),
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return { products, loading };
}
