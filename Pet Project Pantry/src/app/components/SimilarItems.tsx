// app/components/SimilarItems.tsx
import Link from "next/link";
import { getProducts } from "@/app/lib/products";

interface SimilarItemsProps {
  category: string;
  currentProductId: number;
}

export default async function SimilarItems({
  category,
  currentProductId,
}: SimilarItemsProps) {
  const products = await getProducts();
  const similarProducts = products
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 4); // Limit to 4 items

  if (similarProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Similar Items</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {similarProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="border rounded p-2 hover:shadow-md"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-contain"
            />
            <p className="text-sm mt-2 text-gray-700">{product.name}</p>
            <p className="text-green-700 font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
