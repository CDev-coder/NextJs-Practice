import React from 'react';

const ShopLayout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Shop</h1>
        {/* Add navigation or other header components here */}
      </header>
      <main>{children}</main>
      <footer>
        {/* Add footer components here */}
        <p>© 2023 Pet Project Pantry</p>
      </footer>
    </div>
  );
};

export default ShopLayout;