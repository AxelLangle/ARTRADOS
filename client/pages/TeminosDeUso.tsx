import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function TerminosDeUso() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-artra-navy text-[40px] font-bold mb-8">Términos y Condiciones de Uso - ARTRA</h1>

          <div className="space-y-8 text-justify">
            <p className="text-black text-lg leading-relaxed">Última actualización: 6 de octubre de 2025.</p>
            <p className="text-black text-lg leading-relaxed">
              Bienvenido a ARTRA. Te agradecemos por unirte a nuestra misión de conectar el arte y la tradición con el mundo. Al acceder y utilizar nuestra plataforma web (el "Sitio"), aceptas cumplir y quedar vinculado por los siguientes términos y condiciones (los "Términos"). Por favor, léelos con atención.
            </p>

            <ol className="list-decimal pl-6 space-y-6 text-black text-lg leading-relaxed">

                <h2 className="text-artra-navy text-[28px] font-bold mb-3">1. Definiciones Clave</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>ARTRA ("Nosotros"):</strong> Se refiere a la plataforma digital que actúa como un Marketplace Cultural Interactivo, conectando a Usuarios Artesanos con Usuarios Compradores.
                  </li>
                  <li>
                    <strong>Usuario Comprador ("Cliente"):</strong> Toda persona que utiliza el Sitio para descubrir y comprar productos artesanales.
                  </li>
                  <li>
                    <strong>Usuario Artesano ("Artesano"):</strong> Persona o colectivo que se registra en la plataforma para ofrecer y vender sus creaciones artesanales.
                  </li>
                  <li>
                    <strong>Contenido:</strong> Incluye texto, gráficos, imágenes, videos, perfiles de artesanos y descripciones de productos publicados en el Sitio.
                  </li>
                </ul>



                <h2 className="text-artra-navy text-[28px] font-bold mb-3">2. Naturaleza del Servicio</h2>
                <p>
                  ARTRA es una plataforma intermediaria que facilita la venta directa en línea entre Artesanos y Compradores. ARTRA no es el vendedor de los productos. El contrato de compraventa se celebra exclusivamente entre el Cliente y el Artesano. Nuestro diferenciador es ofrecer una conexión cultural, donde cada producto cuenta con un código QR que enlaza a la historia de su creador.
                </p>



                <h2 className="text-artra-navy text-[28px] font-bold mb-3">3. Cuentas de Usuario</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Registro:</strong> Para comprar o vender, deberás crear una cuenta proporcionando información veraz y completa. Eres el único responsable de la actividad que ocurra en tu cuenta.
                  </li>
                    <li>
                    <strong>Verificación:</strong> ARTRA se reserva el derecho de validar la información de los Artesanos para asegurar la autenticidad y el comercio justo.
                  </li>
                </ul>
             

                <h2 className="text-artra-navy text-[28px] font-bold mb-3">4. Obligaciones de las Partes</h2>
                <p className="font-semibold">Usuarios Artesanos:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proporcionar descripciones precisas y fotografías de alta calidad de sus productos.</li>
                  <li>Enviar un video corto (1-2 min) que narre su historia y proceso, para ser vinculado al código QR.</li>
                  <li>Gestionar el inventario, empaquetar y realizar los envíos de los pedidos recibidos de manera oportuna.</li>
                  <li>Responder a las preguntas de los Clientes a través del chat directo de la plataforma.</li>
                </ul>
                <p className="mt-3 font-semibold">Usuarios Compradores:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proporcionar información de pago y envío válida y precisa.</li>
                  <li>Hacer un uso lícito y respetuoso de la plataforma y sus herramientas de comunicación.</li>
                  <li>Cubrir todos los costos asociados a su compra, incluyendo impuestos de importación y aduanas aplicables en su país de destino.</li>
                </ul>



                <h2 className="text-artra-navy text-[28px] font-bold mb-3">5. Proceso de Compra y Comisiones</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Compra:</strong> El Cliente selecciona productos, los añade al carrito de compras y finaliza la transacción a través de pasarelas de pago seguras como tarjeta, PayPal o Stripe.
                  </li>
                  <li>
                    <strong>Comisión:</strong> El Artesano acepta que ARTRA deducirá una comisión del 15% sobre el precio de venta de cada transacción exitosa, antes de transferir el pago a su cuenta.
                  </li>
                </ul>



                <h2 className="text-artra-navy text-[28px] font-bold mb-3">6. Propiedad Intelectual</h2>
                <p>
                  El contenido generado por los Artesanos (fotos, videos, historias) es de su propiedad. Sin embargo, al subirlo a ARTRA, otorgan a la plataforma una licencia no exclusiva y mundial para usar, mostrar y distribuir dicho contenido dentro del Sitio y para fines promocionales. La marca, el logo y el software de ARTRA son propiedad exclusiva de la plataforma.
                </p>
 


                <h2 className="text-artra-navy text-[28px] font-bold mb-3">7. Limitación de Responsabilidad</h2>
                <p>
                  ARTRA, como intermediario, no se hace responsable por la calidad, seguridad o legalidad de los artículos vendidos. La responsabilidad sobre el producto recae enteramente en el Usuario Artesano. ARTRA facilitará la comunicación para la resolución de disputas, pero no es parte del contrato de compraventa.
                </p>


              
                <h2 className="text-artra-navy text-[28px] font-bold mb-3">8. Ley Aplicable y Jurisdicción</h2>
                <p>
                  Estos Términos se regirán por las leyes federales de los Estados Unidos Mexicanos. Para cualquier disputa, las partes se someten a la jurisdicción de los tribunales competentes en la ciudad de Pachuca de Soto, Hidalgo, México.
                </p>
              
            </ol>

            <div className="flex gap-4 justify-center">
              <a
                href="/"
                className="px-8 py-3 bg-artra-blue hover:bg-artra-dark-navy transition-colors rounded-2xl text-white font-semibold"
              >
                Ir al Inicio
              </a>
              <a
                href="/tienda"
                className="px-8 py-3 border-2 border-artra-blue text-artra-navy hover:bg-artra-light-blue transition-colors rounded-2xl font-semibold"
              >
                Ver Tienda
              </a>
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
