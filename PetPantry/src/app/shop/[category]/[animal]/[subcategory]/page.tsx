// filepath: src/app/shop/[category]/[animal]/[subcategory]/page.tsx
import { getProducts } from "@/app/lib/products";
import ShopClient from "../../../ShopClient";

interface Props {
  params: Promise<{ category: string; animal: string; subcategory: string }>;
}

export default async function SubcategoryPage({ params }: Props) {
  const { category, animal, subcategory } = await params;
  const products = await getProducts();
  return (
    <ShopClient
      products={products}
      params={{ category, animal, subcategory }}
    />
  );
}
