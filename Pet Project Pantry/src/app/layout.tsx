import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Pet Pantry",
  description: "Your one-stop shop for all things pets!",
  icons: {
    icon: "/favicon.ico", // default
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
        <NavBar />
        <main className="min-h-screen p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
