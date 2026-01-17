// filepath: src/app/shop/[category]/page.tsx
import ShopClient from "../ShopClient";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params: resolvedParams }: Props) {
  const { category } = await resolvedParams;
  return (
    <ShopClient params={{ category, animal: "all", subcategory: "all" }} />
  );
}
