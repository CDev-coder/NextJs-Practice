import { products } from "@/app/lib/products";
import Link from "next/link";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <p className="mt-2">{product.description}</p>

      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add to Cart
      </button>

      <div className="mt-4">
        <Link href="/">← Back to products</Link>
      </div>
    </div>
  );
}
