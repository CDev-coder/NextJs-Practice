// filepath: src/app/shop/[category]/[animal]/page.tsx
import { getProducts } from "@/app/lib/products";
import ShopClient from "../../ShopClient";

interface Props {
  params: Promise<{ category: string; animal: string }>;
}

export default async function AnimalPage({ params }: Props) {
  const { category, animal } = await params;
  const products = await getProducts();
  return (
    <ShopClient
      products={products}
      params={{ category, animal, subcategory: "all" }}
    />
  );
}
