import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-vp-ivory">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img src="https://picsum.photos/seed/aboutus/600/500" alt="Valeska Ponce trabajando en una joya" className="rounded-lg shadow-xl" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-vp-black mb-4">Sobre Valeska Ponce</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            En Valeska Ponce, creemos que cada joya es más que un simple adorno; es una extensión de tu personalidad, un símbolo de tus momentos más preciados.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Nuestra pasión es crear piezas atemporales con materiales de la más alta calidad y un diseño excepcional. Cada creación es elaborada con meticulosa atención al detalle, fusionando la artesanía tradicional con una estética moderna y sofisticada.
          </p>
          <a href="#contact" className="bg-vp-black text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition-colors duration-300">
            Conoce Más
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;