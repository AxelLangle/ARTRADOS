import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuienEsArtra() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-artra-navy text-[40px] font-bold mb-8">
            ¿Quién es ARTRA?
          </h1>

          <div className="space-y-8 text-justify">
            <div>
              <p className="text-black text-lg leading-relaxed">
                ARTRA es un marketplace cultural interactivo que nace con el
                propósito de conectar a los artesanos mexicanos con el mundo. Es
                una plataforma digital que impulsa el comercio justo y la
                preservación de las tradiciones, permitiendo que cada creación
                artesanal llegue directamente del origen a las manos del
                comprador, sin intermediarios.
              </p>
            </div>

            <div>
              <p className="text-black text-lg leading-relaxed">
                A través de ARTRA, los usuarios pueden explorar una amplia
                variedad de productos auténticos textiles, cerámica, joyería,
                madera y más, cada uno acompañado de un código QR que revela la
                historia del artesano y el proceso de elaboración. De esta forma,
                ARTRA se convierte en un puente entre la cultura, la tradición y
                la innovación, ofreciendo una experiencia de compra con sentido y
                conexión humana.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-artra-navy text-[32px] font-bold mb-6">
                Nuestra Misión
              </h2>
              <p className="text-black text-lg leading-relaxed">
                Facilitar el acceso de los artesanos mexicanos a mercados
                internacionales mediante una plataforma digital transparente y
                confiable. ARTRA busca ofrecer productos artesanales con valor
                cultural, promoviendo el comercio justo, el consumo responsable y
                el desarrollo económico de las comunidades que mantienen vivas
                las raíces culturales de México.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-artra-navy text-[32px] font-bold mb-6">
                Nuestra Visión
              </h2>
              <p className="text-black text-lg leading-relaxed">
                Convertirse en la plataforma líder en la promoción y
                comercialización de artesanías mexicanas a nivel global. ARTRA
                aspira a ser reconocida como un puente cultural que une a los
                artesanos con el mundo, preservando tradiciones, dignificando el
                trabajo artesanal y ofreciendo experiencias únicas basadas en la
                autenticidad y la historia de cada pieza.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-artra-navy text-[32px] font-bold mb-6">
                Valores de ARTRA
              </h2>
              <p className="text-black text-lg leading-relaxed">
                <ul className="list-disc pl-6 space-y-4">
                  <li>
                    <strong>Responsabilidad social:</strong> Compromiso con el bienestar de las comunidades artesanas, promoviendo condiciones de trabajo justas y relaciones comerciales equitativas.
                  </li>
                  <li>
                    <strong>Respeto cultural:</strong> Valoración y preservación de las tradiciones, técnicas y expresiones artesanales como parte fundamental de la identidad mexicana.
                  </li>
                  <li>
                    <strong>Sostenibilidad:</strong> Uso responsable de los recursos naturales y adopción de prácticas que reduzcan el impacto ambiental en todas las operaciones.
                  </li>
                  <li>
                    <strong>Transparencia:</strong> Actuación ética y clara en los procesos comerciales, precios, comisiones y comunicación con artesanos y consumidores.
                  </li>
                  <li>
                    <strong>Innovación:</strong> Aplicación de la tecnología como herramienta para modernizar la comercialización artesanal sin perder su esencia cultural.
                  </li>
                  <li>
                    <strong>Calidad y autenticidad:</strong> Compromiso con la oferta de productos artesanales auténticos, elaborados a mano y con altos estándares de calidad.
                  </li>
                </ul>
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-artra-navy text-[32px] font-bold mb-6">
                Nuestra Sede
              </h2>
              <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d853.4039335068992!2d-98.97887631953121!3d19.714521998777016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDQyJzUyLjMiTiA5OMKwNTgnNDEuNiJX!5e1!3m2!1ses-419!2smx!4v1771028228781!5m2!1ses-419!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de ARTRA"
                ></iframe>
              </div>
              <p className="mt-4 text-center text-gray-600">
                Visítanos en nuestra sede principal.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-artra-blue hover:text-artra-dark-navy transition-colors text-lg font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
