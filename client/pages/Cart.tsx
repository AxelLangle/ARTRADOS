import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors mb-8"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-2xl">Volver</span>
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-bold text-artra-navy mb-8">Mi Carrito</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {items.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-artra-navy">
                <p className="text-xl text-artra-navy/60">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-artra-dark-navy p-4 relative"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-2xl"
                      />

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-artra-navy mb-1">
                          {item.name}
                        </h3>
                        <p className="text-artra-lighter-blue mb-4">
                          Precio unitario: ${item.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-artra-navy flex items-center justify-center hover:bg-artra-blue transition-colors"
                          >
                            <Minus className="w-3 h-3 text-white" />
                          </button>
                          <div className="w-7 h-7 rounded border border-artra-navy flex items-center justify-center bg-white">
                            <span className="text-artra-dark-navy font-medium text-sm">
                              {item.quantity}
                            </span>
                          </div>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-artra-navy flex items-center justify-center hover:bg-artra-blue transition-colors"
                          >
                            <Plus className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-4 right-4 flex flex-col items-center gap-1"
                      >
                        <div className="w-9 h-9 rounded-full bg-artra-navy flex items-center justify-center hover:bg-red-600 transition-colors">
                          <Trash2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-artra-navy font-medium">Eliminar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-[357px]">
            <div className="bg-white rounded-2xl border-2 border-artra-navy p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-artra-dark-navy mb-6">
                Resumen del pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-artra-blue">Subtotal</span>
                  <span className="text-sm font-semibold text-artra-dark-navy">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-artra-blue">Envío</span>
                  <span className="text-sm font-semibold text-artra-dark-navy">
                    Gratis
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-artra-blue">Impuestos</span>
                  <span className="text-sm font-semibold text-artra-dark-navy">
                    $0.00
                  </span>
                </div>
              </div>

              <div className="border-t border-artra-navy pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-black">Total</span>
                  <span className="text-sm font-bold text-artra-dark-navy">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Discount Code Input */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Código de descuento"
                  className="w-full h-14 px-4 rounded-2xl border border-artra-navy bg-white text-artra-dark-navy placeholder:text-artra-lighter-blue focus:outline-none focus:ring-2 focus:ring-artra-blue"
                />
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout/payment"
                className={`w-full h-10 bg-artra-dark-navy hover:bg-artra-navy transition-colors rounded-2xl text-white font-bold flex items-center justify-center ${
                  items.length === 0 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                }`}
              >
                Proceder al pago
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
