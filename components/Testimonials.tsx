
import React from 'react';

const testimonials = [
  {
    name: 'Sofía L.',
    quote: '¡Absolutamente enamorada de mi nuevo collar! La calidad es excepcional y el diseño es aún más hermoso en persona. El servicio al cliente fue impecable.',
    avatar: 'https://picsum.photos/seed/sofia/100/100',
  },
  {
    name: 'Carlos M.',
    quote: 'Compré un anillo para mi aniversario y fue el regalo perfecto. La presentación y el empaque son de lujo. Mi esposa quedó fascinada. ¡Gracias!',
    avatar: 'https://picsum.photos/seed/carlos/100/100',
  },
  {
    name: 'Isabella R.',
    quote: 'La pulsera que adquirí es mi nuevo accesorio favorito. Es elegante, versátil y he recibido muchísimos cumplidos. Definitivamente volveré a comprar.',
    avatar: 'https://picsum.photos/seed/isabella/100/100',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-vp-black">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-vp-ivory p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-vp-gold" />
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <h3 className="font-bold text-vp-black text-lg">- {testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
