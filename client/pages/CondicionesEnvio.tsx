import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PoliticasEnvio() {
  return (
        <Layout>
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-artra-navy text-[40px] font-bold mb-8">Políticas de Envío y Devoluciones - ARTRA</h1>
    
              <div className="space-y-8 text-justify">
                <p className="text-black text-lg leading-relaxed">Última actualización: 6 de octubre de 2025.</p>
                <p className="text-black text-lg leading-relaxed">
                  Bienvenido a ARTRA. Te agradecemos por unirte a nuestra misión de conectar el arte y la tradición con el mundo. Al acceder y utilizar nuestra plataforma web (el "Sitio"), aceptas cumplir y quedar vinculado por los siguientes términos y condiciones (los "Términos"). Por favor, léelos con atención.
                </p>
    
                <ol className="list-decimal pl-6 space-y-6 text-black text-lg leading-relaxed">
    
                    <h2 className="text-artra-navy text-[28px] font-bold mb-3">1. Politicas de envio</h2>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Responsabilidad:</strong> Cada Artesano es responsable de empaquetar y enviar sus productos directamente desde su comunidad o taller.
                      </li>
                      <li>
                        <strong>Tiempos de Procesamiento:</strong> El tiempo de preparación del pedido puede variar de 3 a 7 días hábiles, ya que muchas piezas son únicas y requieren un embalaje cuidadoso.
                      </li>
                      <li>
                        <strong>Envios Internacionales:</strong>  Realizamos envíos a los destinos cubiertos por nuestros socios logísticos. Los tiempos de entrega varían según el destino.
                      </li>
                      <li>
                        <strong>Costos y Aduanas:</strong> El costo de envío se calcula al momento de la compra. Importante: El Cliente es el único responsable de cualquier tarifa de importación, impuesto o arancel aduanero que aplique en su país.
                      </li>
                    </ul>
    
    
    
                    <h2 className="text-artra-navy text-[28px] font-bold mb-3">2. Política de Devoluciones y Reembolsos</h2>
                    <p>
                        Entendemos que compra "con sentiso, para concectar con el origen". Dado que cada productos es una pieza de arte única hecha a mano, nuestra política es la siguiente:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Productos Dañados o Incorrectos:</strong> Si el producto llega dañado o no corresponde con la descripción, el Cliente deberá contactar al Artesano a través del chat de ARTRA en un plazo no mayor a 5 días naturales tras la recepción, adjuntando fotografías como evidencia. En estos casos, se coordinará un reemplazo (si es posible) o un reembolso completo.
                      </li>
                      <li>
                        <strong>Variaciones Artesanales:</strong> No se aceptan devoluciones por pequeñas variaciones en color, tamaño o textura, ya que estas son características inherentes a la naturaleza artesanal del producto y confirman su autenticidad.
                      </li>
                      <li>
                        <strong>Proceso de Devolución:</strong> Una vez aprobada la devolución por un producto dañado, el Cliente recibirá instrucciones para el envío de vuelta. Los costos de este envío serán cubiertos por el Artesano o ARTRA.
                      </li>
                      <li>
                        <strong>Reembolsos:</strong> El reembolso se procesará al método de pago original una vez que el Artesano confirme la recepción del producto devuelto.
                      </li>
                    </ul>
                </ol>
    
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