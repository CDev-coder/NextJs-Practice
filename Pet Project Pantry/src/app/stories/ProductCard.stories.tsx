// ProductCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import ProductCardStoryWrapper from "./ProductCardStoryWrapper"; // import your wrapper

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
