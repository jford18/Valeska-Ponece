import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Collection from './components/Collection.jsx';
import About from './components/About.jsx';
import Testimonials from './components/Testimonials.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Cart from './components/Cart.jsx';
import ProductModal from './components/ProductModal.jsx';
import { useCart } from './hooks/useCart.js';

const App = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
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