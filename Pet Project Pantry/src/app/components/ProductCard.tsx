import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();
  //Product Card will invoke the products path, leading to a dynamic "page". products\[id]
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
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => addItem(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
