import { ArrowLeft, Package, MapPin, Truck, Home, CheckCircle } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { getOrderById, getOrderTracking } from "@/data/mockOrders";
import { getAddressById } from "@/data/mockUsers";

export default function RastrearPedido() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLogged } = useAuth();

  if (!isLogged || !user) {
    navigate("/login");
    return null;
  }

  const order = id ? getOrderById(id) : null;
  const trackingEvents = id ? getOrderTracking(id) : [];
  const address = order ? getAddressById(order.shippingAddressId) : null;

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-xl text-gray-600">Pedido no encontrado</p>
          <div className="text-center mt-4">
            <Link to="/mis-compras" className="text-artra-blue hover:text-artra-navy">
              Volver a Mis Compras
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pedido recibido":
        return <Package className="w-6 h-6" />;
      case "procesando":
        return <Truck className="w-6 h-6" />;
      case "en camino":
        return <MapPin className="w-6 h-6" />;
      case "entrega":
        return <Home className="w-6 h-6" />;
      default:
        return <CheckCircle className="w-6 h-6" />;
    }
  };

  const isEventCompleted = (index: number) => {
    // Los primeros 3 eventos están completados (índices 0, 1, 2)
    return index < 3;
  };

  const isEventCurrent = (index: number) => {
    // El evento en índice 2 es el actual
    return index === 2;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-[1100px]">
        {/* Título */}
        <h1 className="text-4xl font-bold text-artra-navy mb-4">Rastrear Pedido</h1>
        <p className="text-artra-blue text-lg mb-8">
          <span className="font-semibold">Numero de seguimiento:</span> {order.orderNumber}
        </p>

        {/* Mapa */}
        <section className="mb-12">
          <div className="w-full h-[500px] rounded-2xl overflow-hidden border-2 border-artra-blue shadow-lg">
            <img
              src="/images/mapa-rastreo.jpg"
              alt="Mapa de rastreo"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Contenido en dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Historial del pedido */}
          <section>
            <h2 className="text-2xl font-bold text-artra-navy mb-6">Historial del pedido</h2>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="space-y-6">
                {trackingEvents.map((event, index) => {
                  const completed = isEventCompleted(index);
                  const current = isEventCurrent(index);
                  const isLast = index === trackingEvents.length - 1;

                  return (
                    <div key={event.id} className="relative">
                      <div className="flex items-start gap-4">
                        {/* Icono */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            completed
                              ? "bg-artra-navy text-white"
                              : current
                              ? "bg-artra-blue text-white ring-4 ring-artra-blue/30"
                              : "bg-gray-300 text-gray-500"
                          }`}
                        >
                          {getStatusIcon(event.status)}
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 pb-6">
                          <h3
                            className={`text-lg font-bold mb-1 ${
                              completed || current ? "text-artra-navy" : "text-gray-500"
                            }`}
                          >
                            {event.status}
                          </h3>
                          <p
                            className={`text-sm mb-2 ${
                              completed || current ? "text-artra-blue" : "text-gray-400"
                            }`}
                          >
                            {event.timestamp}
                          </p>
                          {event.notes && (
                            <p
                              className={`text-sm ${
                                completed || current ? "text-gray-700" : "text-gray-400"
                              }`}
                            >
                              {event.notes}
                            </p>
                          )}
                          {event.location && (
                            <p
                              className={`text-sm mt-1 flex items-center gap-1 ${
                                completed || current ? "text-artra-blue" : "text-gray-400"
                              }`}
                            >
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Línea conectora */}
                      {!isLast && (
                        <div
                          className={`absolute left-6 top-12 w-0.5 h-full ${
                            completed ? "bg-artra-navy" : "bg-gray-300"
                          }`}
                          style={{ transform: "translateX(-1px)" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Detalles y Ayuda */}
          <div className="space-y-8">
            {/* Detalles */}
            <section>
              <h2 className="text-2xl font-bold text-artra-navy mb-6">Detalles</h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <div>
                  <p className="text-artra-blue font-semibold mb-1">Entrega estimada</p>
                  <p className="text-black text-lg">{order.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-artra-blue font-semibold mb-1">Método de envío</p>
                  <p className="text-black text-lg">{order.shippingMethod}</p>
                </div>
                <div>
                  <p className="text-artra-blue font-semibold mb-1">Dirección</p>
                  {address && (
                    <p className="text-black text-lg">
                      {address.street}, {address.colony}, {address.city}, {address.state}, C.P.{" "}
                      {address.postalCode}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* ¿Necesitas ayuda? */}
            <section>
              <h2 className="text-2xl font-bold text-artra-navy mb-6">¿Necesitas ayuda?</h2>
              <div className="bg-artra-light-bg rounded-2xl p-6">
                <p className="text-artra-blue text-sm mb-4">
                  Si tienes un problema con tu envío o alguna duda, no dudes en contactarnos
                </p>
                <button className="w-full py-3 bg-artra-navy text-white rounded-xl hover:bg-artra-blue transition-colors font-semibold">
                  Contactar a Soporte
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Botón Volver */}
        <Link
          to="/mis-compras"
          className="inline-flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors text-xl"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver</span>
        </Link>
      </div>
    </Layout>
  );
}
