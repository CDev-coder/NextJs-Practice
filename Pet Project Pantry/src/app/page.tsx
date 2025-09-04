import { products } from "./lib/products";
import HomePageMenu from "./components/HomePageMenu";
export default function HomePage() {
  ///Discover by Collection
  return (
    <div className="HomePage">
      <HomePageMenu products={products} />
    </div>
  );
}
