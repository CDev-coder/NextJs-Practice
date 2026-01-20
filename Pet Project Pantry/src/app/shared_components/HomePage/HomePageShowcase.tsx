"use client";

import { motion } from "framer-motion";
import ProductCard from "../Product/ProductCard";
import { Product } from "../../types";
import { useMemo, useState } from "react";
import Image from "next/image";
import MainNavigation from "../Header/MainNavigation";
import { capitalizeFirst } from "../../context/helperFunctions";
import ProductModal from "../Product/ProductModal";
import AddToCartButton from "../Cart/AddToCartButton";

interface HomePageShowcaseProps {
  products: Product[];
}

const HomePageShowcase = ({ products }: HomePageShowcaseProps) => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const featuredDeals = useMemo(
    () =>
      products
        .filter((p) => p.rating >= 4.5 && p.salesVolume > 100)
        .sort((a, b) => b.salesVolume - a.salesVolume)
        .slice(0, 6),
    [products],
  );

  const budgetFriendly = useMemo(
    () =>
      products
        .filter((p) => p.price < 15 && p.rating >= 3.5)
        .sort((a, b) => a.price - b.price)
        .slice(0, 6),
    [products],
  );

  const exploreCategories = useMemo(() => {
    const categories = Array.from(new Set(products.map((p) => p.category)));
    return categories.slice(0, 6);
  }, [products]);

  return (
    <div className="HomePageShowcase_mainDiv">
      <MainNavigation />
      <div className="HomePageShowcase_containerDiv mx-auto px-4 py-10 space-y-12">
        {/* Featured Deals */}
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
                <ProductCard
                  product={p}
                  onInfoClick={() => setActiveProduct(p)}
                  infoButton={true}
                />
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
              const productsInCategory = products.filter(
                (p) => p.category.toLowerCase() === category.toLowerCase(),
              );
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
                  <div className="text-center text-lg font-medium mb-2">
                    {capitalizeFirst(category)}
                  </div>
                  {randomProduct ? (
                    <ProductCard
                      product={randomProduct}
                      infoButton={true}
                      onInfoClick={() => setActiveProduct(randomProduct)}
                    />
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

        {/* Budget-Friendly Picks */}
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
                <ProductCard
                  product={p}
                  onInfoClick={() => setActiveProduct(p)}
                  infoButton={true}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* Single modal for all products */}
      {activeProduct && (
        <ProductModal
          isOpen={!!activeProduct}
          onClose={() => setActiveProduct(null)}
          secondaryButton={<AddToCartButton product={activeProduct} />}
        >
          <h2 className="text-xl font-semibold text-gray-900">
            {activeProduct.name}
          </h2>
          <div className="relative h-48 w-full overflow-hidden rounded-lg">
            <Image
              src={activeProduct.image}
              alt={activeProduct.name}
              width={200}
              height={80}
              className="w-full h-40 object-cover rounded"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            {activeProduct.description}
          </p>
          <p className="text-lg font-medium text-green-700">
            ${activeProduct.price.toFixed(2)}
          </p>
        </ProductModal>
      )}
    </div>
  );
};

export default HomePageShowcase;
