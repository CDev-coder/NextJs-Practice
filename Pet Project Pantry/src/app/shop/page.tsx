// filepath: src/app/shop/[animal]/[category]/page.tsx
import { getProducts } from "@/app/lib/products";
import ShopClient from "./ShopClient";

interface Props {
  params: Promise<{ animal: string; category: string }>; // Note: params is now a Promise
}

export default async function ShopPage({ params }: Props) {
  const { animal, category } = await params; // Await params here
  const products = await getProducts();
  return (
    <ShopClient
      products={products}
      params={{ ...params, subcategory: "all" }}
    />
  );
}
