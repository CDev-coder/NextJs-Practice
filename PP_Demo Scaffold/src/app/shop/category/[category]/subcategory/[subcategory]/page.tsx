import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Product } from '@/app/types';
import { fetchProductsBySubcategory } from '@/app/api'; // Assume this function fetches products based on category and subcategory

const SubcategoryPage = () => {
  const router = useRouter();
  const { category, subcategory } = router.query;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category && subcategory) {
      const fetchProducts = async () => {
        const fetchedProducts = await fetchProductsBySubcategory(category as string, subcategory as string);
        setProducts(fetchedProducts);
        setLoading(false);
      };

      fetchProducts();
    }
  }, [category, subcategory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{subcategory}</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategoryPage;