import { useState } from 'react';
import { Search, HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '¿Cuál es el estado de mi pedido?',
    answer: 'Puedes consultar el estado de tu pedido en la sección "Mis Compras" de tu cuenta. Allí encontrarás información detallada sobre cada pedido y podrás rastrearlo en tiempo real.'
  },
  {
    question: '¿Cómo puedo devolver un artículo?',
    answer: 'Aceptamos devoluciones dentro de los 30 días posteriores a la compra. El artículo debe estar en su estado original. Contacta a nuestro equipo de soporte para iniciar el proceso de devolución.'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PayPal, transferencias bancarias y pagos en efectivo contra entrega en algunas zonas.'
  },
  {
    question: '¿Ofrecen envíos internacionales?',
    answer: 'Actualmente realizamos envíos a todo México. Estamos trabajando para expandir nuestro servicio a nivel internacional. Suscríbete a nuestro boletín para recibir actualizaciones.'
  },
  {
    question: '¿Cómo puedo contactar con el servicio de atención a cliente?',
    answer: 'Puedes contactarnos a través del formulario en la página de Contacto, por teléfono al (555) 123-4567 de lunes a sábado de 9am a 6pm EST, o por email a soporte@artrados.com.'
  }
];

export default function Ayuda() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4">¿Cómo podemos ayudarte?</h1>
          <p className="body-large text-gray-600">
            Encuentra respuestas rápidas o ponte en contacto con nuestro equipo de soporte
          </p>
        </div>

        {/* Opciones de ayuda */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Buscar en el Centro de Ayuda */}
          <div className="bg-white rounded-lg border-2 border-blue p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-light-blue p-3 rounded-full">
                <Search className="w-6 h-6 text-navy" />
              </div>
              <div>
                <h2 className="heading-4 mb-2">Buscar en el Centro de Ayuda</h2>
                <p className="body-base text-gray-600">Busca artículos y guías</p>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Ej: ¿Cómo devolver un producto?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-4 pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Contactar Soporte */}
          <div className="bg-white rounded-lg border-2 border-blue p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-light-blue p-3 rounded-full">
                <HelpCircle className="w-6 h-6 text-navy" />
              </div>
              <div>
                <h2 className="heading-4 mb-2">Contactar Soporte</h2>
                <p className="body-base text-gray-600">¿No encuentras lo que buscas?</p>
              </div>
            </div>
            
            <Link to="/contactanos" className="btn-primary w-full">
              Contactar a Soporte
            </Link>
          </div>
        </div>

        {/* Preguntas Frecuentes */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="heading-2 mb-8 text-center">Preguntas Frecuentes (FAQ)</h2>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-2 border-blue rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-light-blue/30 transition-colors"
                >
                  <span className="heading-4 text-navy">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-navy transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 py-4 bg-light-blue/20 border-t-2 border-blue">
                    <p className="body-base text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Botón volver */}
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center text-navy hover:text-blue">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
