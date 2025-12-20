// filepath: src/app/shop/[category]/page.tsx
import { getProducts } from "@/app/lib/products";
import ShopClient from "../ShopClient";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const products = await getProducts();
  return (
    <ShopClient
      products={products}
      params={{ category, animal: "all", subcategory: "all" }}
    />
  );
}
