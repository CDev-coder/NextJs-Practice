import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: any }) {
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
      <AddToCartButton product={product} />
    </div>
  );
}
