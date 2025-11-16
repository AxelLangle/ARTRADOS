import { ArrowLeft, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { getActiveOrders, getPastOrders, getStatusLabel, Order } from "@/data/mockOrders";
import { getAddressById } from "@/data/mockUsers";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function MisCompras() {
  const navigate = useNavigate();
  const { user, isLogged } = useAuth();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isLogged || !user) {
    navigate("/login");
    return null;
  }

  const activeOrders = getActiveOrders(user.id);
  const pastOrders = getPastOrders(user.id);

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addItem({
        id: item.productId,
        name: item.productName,
        price: item.price,
        image: item.productImage,
      });
    });
    toast({
      title: "Productos agregados",
      description: `${order.items.length} producto(s) agregados al carrito.`,
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-[1000px]">
        {/* Título */}
        <h1 className="text-4xl font-bold text-artra-navy mb-12">Mi compras</h1>

        {/* Compras activas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-artra-navy mb-8">Compras activas</h2>
          <div className="space-y-6">
            {activeOrders.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl">No tienes compras activas</p>
              </div>
            ) : (
              activeOrders.map((order) => {
                const address = getAddressById(order.shippingAddressId);
                return (
                  <div
                    key={order.id}
                    className="border-2 border-artra-blue rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-6">
                      {/* Imagen del producto */}
                      <div className="w-24 h-24 rounded-xl bg-artra-lighter-blue/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {order.items[0]?.productImage ? (
                          <img
                            src={order.items[0].productImage}
                            alt="Producto"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-12 h-12 text-artra-blue" />
                        )}
                      </div>

                      {/* Info del pedido */}
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-artra-blue font-semibold text-sm mb-1">
                            #Numero de pedido
                          </p>
                          <p className="text-black text-lg font-bold">#{order.orderNumber}</p>
                        </div>
                        <div>
                          <p className="text-artra-blue font-semibold text-sm mb-1">
                            Fecha de compra
                          </p>
                          <p className="text-black text-lg">{order.createdAt}</p>
                        </div>
                        <div>
                          <p className="text-artra-blue font-semibold text-sm mb-1">Total</p>
                          <p className="text-black text-lg font-bold">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-4 py-2 text-artra-navy hover:text-artra-blue font-medium underline text-sm whitespace-nowrap"
                        >
                          Ver detalles
                        </button>
                        <span
                          className={`px-4 py-2 rounded-lg text-sm font-semibold text-center ${getStatusBadgeColor(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                      <p className="text-artra-navy text-sm">
                        <span className="font-semibold">Entrega estimada:</span>{" "}
                        {order.estimatedDelivery}
                      </p>
                      {order.status === "shipped" && (
                        <Link
                          to={`/rastrear-pedido/${order.id}`}
                          className="px-6 py-3 bg-artra-navy text-white rounded-xl hover:bg-artra-blue transition-colors font-semibold flex items-center gap-2"
                        >
                          <Package className="w-5 h-5" />
                          Rastrear paquete
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Compras anteriores */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-artra-navy mb-8">Compras anteriores</h2>
          <div className="border-2 border-artra-blue rounded-2xl overflow-hidden">
            {pastOrders.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-xl">No tienes compras anteriores</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-artra-light-bg">
                  <tr>
                    <th className="px-6 py-4 text-left text-artra-blue font-semibold">
                      #Numero de pedido
                    </th>
                    <th className="px-6 py-4 text-left text-artra-blue font-semibold">
                      Fecha de compra
                    </th>
                    <th className="px-6 py-4 text-left text-artra-blue font-semibold">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-artra-blue font-semibold">
                      Estado
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {pastOrders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-200">
                      <td className="px-6 py-4 text-black">#{order.orderNumber}</td>
                      <td className="px-6 py-4 text-black">{order.createdAt}</td>
                      <td className="px-6 py-4 text-black font-bold">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-artra-navy hover:text-artra-blue font-medium underline text-sm"
                          >
                            Ver detalles
                          </button>
                          <button
                            onClick={() => handleReorder(order)}
                            className="px-4 py-2 bg-artra-lighter-blue/30 text-artra-navy rounded-lg hover:bg-artra-lighter-blue/50 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            Volver a comprar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Botón Volver */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors text-xl"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver</span>
        </Link>
      </div>

      {/* Dialog Ver Detalles */}
      <Dialog open={selectedOrder !== null} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-artra-navy">
              Detalles del Pedido #{selectedOrder?.orderNumber}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6 py-4">
              {/* Info general */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-artra-blue font-semibold text-sm mb-1">Fecha de compra</p>
                  <p className="text-black">{selectedOrder.createdAt}</p>
                </div>
                <div>
                  <p className="text-artra-blue font-semibold text-sm mb-1">Estado</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getStatusBadgeColor(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>
                <div>
                  <p className="text-artra-blue font-semibold text-sm mb-1">Método de envío</p>
                  <p className="text-black">{selectedOrder.shippingMethod}</p>
                </div>
                <div>
                  <p className="text-artra-blue font-semibold text-sm mb-1">
                    Entrega estimada
                  </p>
                  <p className="text-black">{selectedOrder.estimatedDelivery}</p>
                </div>
              </div>

              {/* Dirección de envío */}
              <div>
                <p className="text-artra-blue font-semibold text-sm mb-2">Dirección de envío</p>
                <p className="text-black">
                  {getAddressById(selectedOrder.shippingAddressId)?.street},{" "}
                  {getAddressById(selectedOrder.shippingAddressId)?.city}
                </p>
              </div>

              {/* Productos */}
              <div>
                <p className="text-artra-blue font-semibold text-sm mb-3">Productos</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-black">{item.productName}</p>
                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-artra-navy">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-artra-navy">Total</p>
                  <p className="text-2xl font-bold text-artra-navy">
                    ${selectedOrder.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
