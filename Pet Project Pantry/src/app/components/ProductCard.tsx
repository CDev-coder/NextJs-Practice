import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="ProductCardDiv border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="ProductCard_Link w-full h-40 object-cover rounded"
        />
        <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
        <h4 className="text-base font-light">{product.brand}</h4>
      </Link>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
}
