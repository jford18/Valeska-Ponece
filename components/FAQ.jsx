import React, { useState } from 'react';

const faqData = [
  {
    question: '¿Qué materiales utilizan para sus joyas?',
    answer: 'Utilizamos solo materiales de la más alta calidad, incluyendo oro de 18k, plata de ley 925 y acero inoxidable quirúrgico. Todas nuestras gemas son seleccionadas cuidadosamente por su brillo y pureza.'
  },
  {
    question: '¿Cómo debo cuidar mis joyas Valeska Ponce?',
    answer: 'Recomendamos guardar sus joyas en un lugar seco y limpio, preferiblemente en su empaque original. Evite el contacto con productos químicos como perfumes o lociones. Limpie sus piezas regularmente con un paño suave.'
  },
  {
    question: '¿Cuál es su política de envíos y devoluciones?',
    answer: 'Ofrecemos envío estándar gratuito en todas las compras. Si no está completamente satisfecho con su compra, aceptamos devoluciones dentro de los 30 días posteriores a la recepción del pedido, siempre que la pieza esté en su estado original.'
  },
  {
    question: '¿Ofrecen personalización o piezas a medida?',
    answer: 'Sí, ofrecemos servicios de personalización para ciertas piezas. Por favor, contáctenos a través de nuestro formulario para discutir sus ideas y recibir una cotización. ¡Nos encantaría crear algo único para usted!'
  }
];

const FaqItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-300">
      <button onClick={onClick} className="w-full text-left py-4 flex justify-between items-center focus:outline-none">
        <span className="text-lg font-semibold text-vp-black">{faq.question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="py-4 text-gray-700 leading-relaxed pr-6">{faq.answer}</p>
      </div>
    </div>
  );
}

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    }
  return (
    <section id="faq" className="py-20 bg-vp-ivory">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-vp-black">Preguntas Frecuentes</h2>
        <div className="space-y-4">
            {faqData.map((faq, index) => (
                <FaqItem 
                    key={index} 
                    faq={faq} 
                    isOpen={openIndex === index} 
                    onClick={() => handleClick(index)} 
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;