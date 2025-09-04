import { products } from "./lib/products";
import ProductCard from "./components/ProductCard";
import HomePageMenu from "./components/HomePageMenu";
export default function HomePage() {
  return (
    <div className="HomePage">
      <HomePageMenu products={products} />
    </div>
  );
}
