import { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/products`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: Product[] = await res.json();
  return data;
}
