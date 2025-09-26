
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Collection from './components/Collection';
import About from './components/About';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductModal from './components/ProductModal';
import { useCart } from './hooks/useCart';
import type { Product } from './types';

const App: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (isCartOpen || selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCartOpen, selectedProduct]);

  return (
    <div className="bg-vp-ivory text-vp-black font-sans">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={getTotalItems()} />
      <main>
        <Hero />
        <Collection onProductClick={handleProductClick} addToCart={addToCart} />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
      />
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={closeModal}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default App;
