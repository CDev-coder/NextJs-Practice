// app/layout.tsx
import "./globals.css";
import { FilterProvider } from "./context/FilterContext";
import NavBarWrapper from "./wrappers/NavBarWrapper";
import Footer from "./components/Footer";
import { products } from "./lib/products";

export const metadata = {
  title: "Pet Pantry",
  description: "Your one-stop shop for all things pets!",
  icons: {
    icon: "/favicon.ico",
    shortcut: "icons/favicon-16x16.png",
    apple: "icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900">
        <FilterProvider products={products}>
          <NavBarWrapper>
            <main className="min-h-screen p-6">{children}</main>
          </NavBarWrapper>
          <Footer />
        </FilterProvider>
      </body>
    </html>
  );
}
