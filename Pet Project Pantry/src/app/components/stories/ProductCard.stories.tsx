// ProductCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";

// Minimal mock of AddToCartButton for Storybook
const MockAddToCartButton = () => (
  <button className="mt-2 w-full rounded bg-blue-600 text-white py-2">
    Add to Cart
  </button>
);

// Storybook-only wrapper that replicates ProductCard but uses mock button
const ProductCardStoryWrapper = ({ product }: { product: any }) => (
  <div className="ProductCardDiv border rounded-lg p-4 shadow hover:shadow-lg transition max-w-xs mx-auto">
    <Link href={`/products/${product.id}`}>
      <img
        src={product.image}
        alt={product.name}
        className="ProductCard_Link w-full h-48 sm:h-40 md:h-52 lg:h-56 object-cover rounded"
      />
      <div className="flex justify-between items-center mt-2 mb-2">
        <h3 className="text-base sm:text-lg font-semibold line-clamp-2">
          {product.name}
        </h3>
        <span className="text-green-600 font-medium">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </Link>
    <MockAddToCartButton />
  </div>
);

const meta: Meta<typeof ProductCardStoryWrapper> = {
  title: "Pet Store/ProductCard",
  component: ProductCardStoryWrapper,
};

export default meta;

type Story = StoryObj<typeof ProductCardStoryWrapper>;

export const Default: Story = {
  args: {
    product: {
      id: "dog-treats-001",
      name: "Dog Food - Dry 1",
      price: 14.99,
      image: "/products/food/DogFood_1.png",
    },
  },
};

export const LongName: Story = {
  args: {
    product: {
      id: "dog-treats-002",
      name: "Organic Grain-Free Limited Ingredient Hypoallergenic Dog Treats",
      price: 19.99,
      image: "https://placehold.co/400x300",
    },
  },
};

export const Expensive: Story = {
  args: {
    product: {
      id: "dog-bed-001",
      name: "Luxury Dog Bed Extra Plush Edition",
      price: 129.99,
      image: "https://placehold.co/400x300",
    },
  },
};
