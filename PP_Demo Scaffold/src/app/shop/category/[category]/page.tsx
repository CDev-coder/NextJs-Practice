import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Product } from '@/app/types';
import { fetchProductsByCategory } from '@/app/api'; // Assume this function fetches products based on category

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      const fetchProducts = async () => {
        const fetchedProducts = await fetchProductsByCategory(category as string);
        setProducts(fetchedProducts);
        setLoading(false);
      };
      fetchProducts();
    }
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <h2 className="font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-gray-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}