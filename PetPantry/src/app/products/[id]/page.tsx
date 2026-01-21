// app/products/[id]/page.tsx
import AddToCartButton from "@/app/shared_components/Cart/AddToCartButton";
import ProductBreadcrumb from "@/app/shared_components/Product/ProductBreadCrumb";
import SimilarItems from "@/app/shared_components/Product/SimilarItems";
import { getProducts } from "@/app/lib/products";
import Link from "next/link";
import Image from "next/image";

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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ProductBreadcrumb product={product} />
      <Link href="/" className="text-sm text-gray-500 hover:text-black">
        ← Back to products
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full rounded"
            width={500}
            height={500}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-semibold text-green-700">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <AddToCartButton product={product} />
        </div>
      </div>
      <SimilarItems category={product.category} currentProductId={product.id} />
    </div>
  );
}
