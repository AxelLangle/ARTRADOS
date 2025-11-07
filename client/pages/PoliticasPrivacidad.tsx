import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AvisoPrivacidad() {
  return (
        <Layout>
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-artra-navy text-[40px] font-bold mb-8">Aviso de Privacidad - ARTRA</h1>
    
              <div className="space-y-8 text-justify">
                <p className="text-black text-lg leading-relaxed">Responsable; ARTRA Marketplace, S.A. de C.V. ("ARTRA"), con domicilio en Teotihuacan, Estado de México, México.</p>
                <ol className="list-decimal pl-6 space-y-6 text-black text-lg leading-relaxed">
    
                    <h2 className="text-artra-navy text-[28px] font-bold mb-3">1. Datos Personales Recabados</h2>
                    <p className="text-black text-lg leading-relaxed"> Recabamos los siguientes datos de nuestras dos clases de usuarios: </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Clientes: </strong> Nombre, correo electrónico, domicilio de envío, y datos de pago que son procesados directamente por nuestros proveedores de servicios de pago (Stripe, PayPal).
                      </li>
                      <li>
                        <strong>Artesanos:</strong> Nombre, comunidad de origen, tipo de artesanía, datos de contacto, y cuenta bancaria para la recepción de pagos.
                      </li>
                    </ul>
    
    
                    <h2 className="text-artra-navy text-[28px] font-bold mb-3">2. Finalidades del Tratamiento</h2>
                    <p>
                        Sus datos personales seran utilizados para:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      
                      <strong>Finalidades Primarias:</strong> 
                            <li>Crear y gestionar su cuenta de usuario.</li>
                            <li>Procesar sus compras y los pagos correspondientes.</li>
                            <li>Facilitar la comunicacion entre Clientes y Artesanos.</li>
                            <li>Coordinar el envio de productos.</li>
                      <br/>
                        <strong>Finalidades Secundarias:</strong>
                            <li>Enviar comunicaciones promocionales sobre productos destacados o nuevas "Historias".</li>
                            <li>Personalizar su experiencia de navegacion en la plataforma.</li>
                      
                    </ul>

                    <h2 className="text-artra-navy text-[28px] font-bold mb-3">3. Transferencia de Datos</h2>
                    <p className="text-black text-lg leading-relaxed"> Pára cumplir con las finalidades descritas, sus datos pueden ser transferidos a: </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Artesanos: </strong> Para que puedan realizar el envio de los productos de los pedidos.
                      </li>
                      <li>
                        <strong>Empresas de logistica y paqueteria:</strong> Para la entrega de los pedidos.
                      </li>
                      <li>
                        <strong>Pasarelas de pago:</strong> Para procesar las transacciones de forma segura.
                      </li>
                    </ul>

                    <h2 className="text-artra-navy text-[28px] font-bold mb-3">4. Derechos ARCO: </h2>
                    <p className="text-black text-lg leading-relaxed"> Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, por favor envíe una solicitud al correo electrónico: privacidad@artra.mx. </p>

                    <h2 className="text-artra-navy text-[28px] font-bold mb-3">5. Uso de Cookies: </h2>
                    <p className="text-black text-lg leading-relaxed"> Utilizamos cookies para mejorar la funcionalidad del sitio, recordar sus preferencias y analizar el trafico. Al navegar en ARTRA usted acepta su uso.</p>
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