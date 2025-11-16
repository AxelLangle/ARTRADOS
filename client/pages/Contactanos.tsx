import { useState } from 'react';
import { Phone, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contactanos() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4">Contáctanos</h1>
          <p className="body-large text-gray-600">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros a través de cualquiera de los siguientes canales
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Soporte Telefónico */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-light-blue p-3 rounded-full">
                <Phone className="w-6 h-6 text-navy" />
              </div>
              <div>
                <h2 className="heading-3 mb-2">Soporte Telefónico</h2>
                <p className="body-base text-gray-600 mb-4">
                  Habla con un agente de nuestro equipo de soporte
                </p>
                <p className="body-small text-gray-500 mb-4">
                  Lun - Sáb, 9am a 6pm EST
                </p>
                <a
                  href="tel:+525551234567"
                  className="text-blue hover:text-navy font-semibold"
                >
                  Llama ahora
                </a>
              </div>
            </div>
          </div>

          {/* Centro de Ayuda & FAQ */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-light-blue p-3 rounded-full">
                <HelpCircle className="w-6 h-6 text-navy" />
              </div>
              <div>
                <h2 className="heading-3 mb-2">Centro de Ayuda & FAQ</h2>
                <p className="body-base text-gray-600 mb-4">
                  Encuentra respuestas a preguntas frecuentes
                </p>
                <Link
                  to="/ayuda"
                  className="text-blue hover:text-navy font-semibold"
                >
                  Visitar centro de ayuda
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 max-w-2xl mx-auto">
          <h2 className="heading-3 mb-6">Envíanos un mensaje</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="block body-base font-semibold text-navy mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                required
                className="input-field w-full"
              />
            </div>

            {/* Correo electrónico */}
            <div>
              <label htmlFor="email" className="block body-base font-semibold text-navy mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo electrónico"
                required
                className="input-field w-full"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="phone" className="block body-base font-semibold text-navy mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ingresa tu número de teléfono"
                className="input-field w-full"
              />
            </div>

            {/* Mensaje */}
            <div>
              <label htmlFor="message" className="block body-base font-semibold text-navy mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribe tu mensaje"
                required
                rows={5}
                className="input-field w-full resize-none"
              />
            </div>

            {/* Status messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
                ¡Mensaje enviado exitosamente! Te responderemos pronto.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                Error al enviar el mensaje. Por favor intenta de nuevo.
              </div>
            )}

            {/* Botón enviar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>

        {/* Botón volver */}
        <div className="mt-8 text-center">
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
