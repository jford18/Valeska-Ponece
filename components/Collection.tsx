
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface CollectionProps {
  onProductClick: (product: Product) => void;
  addToCart: (product: Product) => void;
}

const Collection: React.FC<CollectionProps> = ({ onProductClick, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [materialFilter, setMaterialFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const materials = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.material)))];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      return (
        (product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (categoryFilter === 'All' || product.category === categoryFilter) &&
        (materialFilter === 'All' || product.material === materialFilter)
      );
    });
  }, [searchTerm, categoryFilter, materialFilter]);

  return (
    <section id="collection" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-vp-black">Nuestra Colección</h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Cada pieza es una obra de arte, diseñada para resaltar tu belleza y contar tu historia. Explora nuestras creaciones y encuentra la joya perfecta para ti.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vp-gold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full md:w-auto p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vp-gold bg-white"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'Todas las Categorías' : cat}</option>)}
          </select>
          <select
            className="w-full md:w-auto p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vp-gold bg-white"
            value={materialFilter}
            onChange={(e) => setMaterialFilter(e.target.value)}
          >
            {materials.map(mat => <option key={mat} value={mat}>{mat === 'All' ? 'Todos los Materiales' : mat}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onProductClick={onProductClick}
              addToCart={addToCart}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-8 text-lg">No se encontraron productos que coincidan con su búsqueda.</p>
        )}
      </div>
    </section>
  );
};

export default Collection;
