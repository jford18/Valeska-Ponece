import React from 'react';

const ProductModal = ({ product, onClose, addToCart }) => {
  
  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row animate-fade-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-full md:w-1/2">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <span className="text-sm text-gray-500 uppercase tracking-widest">{product.category} / {product.material}</span>
            <h2 className="text-4xl font-bold text-vp-black my-3">{product.name}</h2>
            <p className="text-3xl font-light text-vp-gold mb-6">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{product.description}</p>
            <button
                onClick={handleAddToCart}
                className="w-full bg-vp-gold text-vp-black font-bold py-3 px-6 rounded-md text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
                Añadir al Carrito
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;