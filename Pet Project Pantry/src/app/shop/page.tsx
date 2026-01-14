// filepath: src/app/shop/[animal]/[category]/page.tsx
import ShopClient from "./ShopClient";

interface Props {
  params: Promise<{ animal: string; category: string }>; // Note: params is now a Promise
}

export default async function ShopPage({ params }: Props) {
  const resolvedParams = await params;
  return <ShopClient params={{ ...resolvedParams, subcategory: "all" }} />;
}
