
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-4 text-vp-black">Contáctanos</h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          ¿Tienes alguna pregunta o solicitud especial? Estamos aquí para ayudarte.
        </p>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Tu Nombre" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vp-gold" />
            <input type="email" placeholder="Tu Correo Electrónico" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vp-gold" />
          </div>
          <input type="text" placeholder="Asunto" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vp-gold" />
          <textarea placeholder="Tu Mensaje" rows={6} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vp-gold"></textarea>
          <div className="text-center">
            <button type="submit" className="bg-vp-gold text-vp-black font-bold py-3 px-12 rounded-md text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
              Enviar Mensaje
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
