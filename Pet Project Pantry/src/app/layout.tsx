// app/layout.tsx
import "./globals.css";
import { FilterProvider } from "./context/FilterContext";
import NavBarWrapper from "./wrappers/NavBarWrapper";
import Footer from "./components/Footer";
import { getProducts } from "./lib/products";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "Pet Pantry",
  description: "Your one-stop shop for all things pets!",
  icons: {
    icon: "/favicon.ico",
    shortcut: "icons/favicon-16x16.png",
    apple: "icons/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getProducts();
  return (
    <html lang="en">
      <body className="font-sans text-gray-900 bg-(--background)">
        <FilterProvider products={products}>
          <CartProvider>
            <NavBarWrapper>
              <main className="min-h-screen p-6">{children}</main>
            </NavBarWrapper>
          </CartProvider>
          <Footer />
        </FilterProvider>
      </body>
    </html>
  );
}
