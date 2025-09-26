import React from 'react';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://picsum.photos/seed/jewelrybg/1920/1080')" }}
    >
      <div className="absolute inset-0 bg-vp-black bg-opacity-40"></div>
      <div className="relative z-10 text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
          Elegancia que Perdura
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
          Descubre piezas únicas que celebran tu esencia.
        </p>
        <a 
          href="#collection" 
          className="bg-vp-gold text-vp-black font-bold py-3 px-8 rounded-md text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Ver Colección
        </a>
      </div>
    </section>
  );
};

export default Hero;