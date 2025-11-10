// app/products/[id]/page.tsx
import AddToCartButton from "@/app/components/AddToCartButton";
import { getProducts } from "@/app/lib/products";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ id: string }>; // ✅ Now we reflect that params is async
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params; // Await the promise

  const products = await getProducts();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div>Product not found</div>;
  console.log(product);
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover rounded"
      />
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <p className="mt-2">{product.description}</p>

      <AddToCartButton product={product} />

      <div className="mt-4">
        <Link href="/">← Back to products</Link>
      </div>
    </div>
  );
}
