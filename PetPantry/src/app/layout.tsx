// app/layout.tsx
import "./globals.css";
import { FilterProvider } from "./context/FilterContext";
import NavBarWrapper from "./wrappers/NavBarWrapper";
import Footer from "./shared_components/Footer/Footer";
import { getProducts } from "./lib/products";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // regular and bold
  variable: "--font-merriweather",
});

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
    <html lang="en" className={merriweather.variable}>
      <body className="font-sans text-gray-900 bg-background">
        <FilterProvider products={products}>
          <UserProvider>
            <CartProvider>
              <NavBarWrapper>
                <main className="min-h-screen">{children}</main>
              </NavBarWrapper>
            </CartProvider>
          </UserProvider>
          <Footer />
        </FilterProvider>
      </body>
    </html>
  );
}
