import React from 'react';

const Cart = ({ isOpen, onClose, cartItems, removeFromCart, updateQuantity, clearCart }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      ></div>
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-vp-ivory shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-vp-black">Carrito de Compras</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-xl text-gray-500">Tu carrito está vacío.</p>
              <button onClick={onClose} className="mt-6 bg-vp-gold text-vp-black font-bold py-2 px-6 rounded-md hover:bg-yellow-400 transition-colors">
                Seguir Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-vp-black">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} className="w-16 p-1 border rounded-md text-center"/>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm">Quitar</button>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Subtotal:</span>
                  <span className="text-xl font-bold text-vp-gold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-vp-gold text-vp-black font-bold py-3 rounded-md hover:bg-yellow-400 transition-colors">Finalizar Compra</button>
                  <button onClick={clearCart} className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-md hover:bg-gray-300 transition-colors">Vaciar Carrito</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;