
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, addToCart }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className="relative cursor-pointer" onClick={() => onProductClick(product)}>
        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-white px-4 py-2 rounded-md">Ver Detalle</span>
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-vp-black mb-1">{product.name}</h3>
        <p className="text-gray-500 mb-3">{product.category} de {product.material}</p>
        <p className="text-2xl font-bold text-vp-gold mb-4">${product.price.toFixed(2)}</p>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-vp-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
