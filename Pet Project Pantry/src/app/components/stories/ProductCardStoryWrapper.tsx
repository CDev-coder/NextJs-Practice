// ProductCardStoryWrapper.tsx
import Link from "next/link";

const MockAddToCartButton = () => (
  <button className="mt-2 w-full rounded bg-blue-600 text-white py-2">
    Add to Cart
  </button>
);

export default function ProductCardStory({ product }: { product: any }) {
  return (
    <div className="ProductCardDiv border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="ProductCard_Link w-full h-40 object-cover rounded"
        />
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="text-green-600 font-medium">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </Link>
      <MockAddToCartButton />
    </div>
  );
}
