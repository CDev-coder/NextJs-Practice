import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function ShopLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}