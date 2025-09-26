import React, { useState, useEffect } from 'react';

const Logo = () => (
  <div className="flex items-center space-x-4">
    <div className="bg-vp-black w-12 h-12 rounded-full flex items-center justify-center">
      <span className="text-vp-gold font-bold text-xl">VP</span>
    </div>
    <span className="text-2xl font-semibold text-vp-black">Valeska Ponce</span>
  </div>
);

const NavLinks = ({ className }) => (
  <nav className={className}>
    <a href="#collection" className="hover:text-vp-gold transition-colors duration-300">Colección</a>
    <a href="#about" className="hover:text-vp-gold transition-colors duration-300">Nosotros</a>
    <a href="#testimonials" className="hover:text-vp-gold transition-colors duration-300">Testimonios</a>
    <a href="#faq" className="hover:text-vp-gold transition-colors duration-300">FAQ</a>
    <a href="#contact" className="hover:text-vp-gold transition-colors duration-300">Contacto</a>
  </nav>
);

const Header = ({ onCartClick, cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-vp-ivory/90 shadow-md backdrop-blur-sm' : 'bg-vp-ivory'}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks className="flex items-center space-x-6 text-lg" />
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={onCartClick} className="relative hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-vp-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-vp-gold text-vp-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-vp-ivory/95 backdrop-blur-sm pb-4">
          <NavLinks className="flex flex-col items-center space-y-4 text-lg" />
        </div>
      )}
    </header>
  );
};

export default Header;