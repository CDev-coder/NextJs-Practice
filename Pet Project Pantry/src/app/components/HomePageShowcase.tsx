// components/HomePageShowcase.tsx
"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "../types";
import { useMemo } from "react";

interface HomePageShowcaseProps {
  products: Product[];
}

const HomePageShowcase = ({ products }: HomePageShowcaseProps) => {
  // Demo selections (replace with API logic later)
  const featuredDeals = useMemo(
    () => products.filter((p) => p.price && p.price > 20).slice(0, 6),
    [products]
  );
  const budgetFriendly = useMemo(
    () => products.filter((p) => p.price < 20).slice(0, 6),
    [products]
  );
  const exploreCategories = useMemo(() => {
    const categories = Array.from(new Set(products.map((p) => p.category)));
    return categories.slice(0, 6);
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-10 space-y-12">
      <section aria-labelledby="featured-deals-title">
        <h2 className="text-2xl font-semibold mb-4">Featured Deals</h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {featuredDeals.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* Explore by Category */}
      <section aria-labelledby="category-title">
        <h2 id="category-title" className="text-2xl font-semibold mb-4">
          Explore by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {exploreCategories.map((category, i) => {
            // Filter all products that match this category
            const productsInCategory = products.filter(
              (p) => p.category.toLowerCase() === category.toLowerCase()
            );

            // Pick one random product
            const randomProduct =
              productsInCategory[
                Math.floor(Math.random() * productsInCategory.length)
              ];

            return (
              <motion.div
                key={category + i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 rounded-xl shadow-md cursor-pointer hover:bg-blue-100 transition p-2 flex flex-col"
              >
                {/* Category Title */}
                <div className="text-center text-lg font-medium mb-2">
                  {category}
                </div>

                {/* Random Product (if found) */}
                {randomProduct ? (
                  <ProductCard product={randomProduct} />
                ) : (
                  <div className="text-center text-gray-500 text-sm">
                    No items found
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/*Budget Friendly Picks */}
      <section aria-labelledby="budget-title">
        <h2 className="text-2xl font-semibold mb-4">Budget-Friendly Picks</h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {budgetFriendly.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default HomePageShowcase;
