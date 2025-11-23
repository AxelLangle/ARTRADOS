import { useState } from 'react';
import { Edit, MapPin, Image as ImageIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { usePayment } from "@/contexts/PaymentContext";
import { useAddress } from "@/contexts/AddressContext";
import AddressFormModal from "@/components/AddressFormModal";

export default function OrderSummary() {
  const navigate = useNavigate();
  const { items, total } = useCart();
  const { selectedPaymentMethod } = usePayment();
  const { selectedAddress } = useAddress();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);

  const handleConfirm = () => {
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/mis-compras");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        <h1 className="text-artra-navy text-[40px] font-bold mb-12">
          Confirmacion de pedido
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Left Column - Summary Box */}
          <div>
            <div className="bg-[#F7FAFC] border-3 border-artra-dark-navy rounded-2xl p-6">
              <h2 className="text-black text-[28px] font-bold mb-6">
                Revisa y confirma
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#476B9E] text-xl">Producto</span>
                  <span className="text-black text-xl font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#476B9E] text-xl">Envío</span>
                  <span className="text-black text-xl font-bold">Gratis</span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-black text-[26px] font-bold">Pagas</span>
                  <span className="text-black text-xl font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full h-12 bg-artra-dark-navy hover:bg-artra-navy transition-colors rounded-lg"
              >
                <span className="text-white text-xl font-bold">
                  Confirmar compra
                </span>
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Delivery Details */}
            <div>
              <h2 className="text-artra-navy text-[35px] font-bold mb-6">
                Detalle de la entrega
              </h2>
              <div className="bg-white border-3 border-artra-dark-navy rounded-2xl p-8">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-[19.5px] border border-[#060357] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-10 h-10 text-artra-dark-navy" fill="#081F44" />
                  </div>
                  <div className="flex-1">
                    <p className="text-artra-blue text-[28px] font-bold mb-2">
                      {selectedAddress?.name}
                    </p>
                    <p className="text-black text-2xl">
                      {selectedAddress?.street}, {selectedAddress?.city},{" "}
                      {selectedAddress?.state}, C.P. {selectedAddress?.postal_code}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-300 mt-6 pt-6">
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="flex items-center gap-3 text-artra-navy hover:text-artra-blue transition-colors"
                  >
                    <Edit className="w-7 h-7" strokeWidth={2.5} />
                    <span className="text-xl font-bold">
                      Modificar dirección de envio
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Products to Deliver */}
            <div className="bg-white border-3 border-artra-dark-navy rounded-2xl p-8">
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 rounded-[19.5px] border border-[#060357] flex items-center justify-center flex-shrink-0 bg-gray-100">
                  {items.length > 0 ? (
                    <div className="flex -space-x-2">
                      {items.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs font-bold"
                        >
                          {item.quantity}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ImageIcon className="w-12 h-12 text-artra-dark-navy" fill="#081F44" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-artra-blue text-[28px] font-bold mb-2">
                    Llega en 3 días a tu domicilio
                  </p>
                  <button
                    onClick={() => setShowProductsModal(true)}
                    className="text-artra-dark-navy text-xl hover:text-artra-blue transition-colors"
                  >
                    Mostrar productos ({items.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-black text-[35px] font-bold mb-6">
                Detalle del pago
              </h2>
              <div className="bg-white border-3 border-artra-dark-navy rounded-2xl p-8">
                <div className="flex gap-6">
                  <div className="w-[100px] h-[100px] rounded-full border-2 border-[#060357] flex items-center justify-center flex-shrink-0 bg-white">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/2700408bf80c989498ef28ca707906afb1a62e9b?width=158"
                      alt="Visa"
                      className="w-20 h-7"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-artra-blue text-[28px] font-bold mb-2">
                      {selectedPaymentMethod?.bank} {selectedPaymentMethod?.cardNumber}
                    </p>
                    <p className="text-black text-2xl mb-2">
                      ${total.toFixed(2)}
                    </p>
                    <button className="text-artra-dark-navy text-xl hover:text-artra-blue transition-colors">
                      Modificar meses
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-300 mt-6 pt-6">
                  <button
                    onClick={() => navigate("/checkout/payment")}
                    className="flex items-center gap-3 text-artra-navy hover:text-artra-blue transition-colors"
                  >
                    <Edit className="w-7 h-7" strokeWidth={2.5} />
                    <span className="text-xl font-bold">Modificar forma de pago</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Compra Exitosa */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-artra-navy mb-2">¡Compra Exitosa!</h2>
            <p className="text-gray-600 mb-6">
              Tu pedido ha sido confirmado. Recibirás un correo de confirmación en breve.
            </p>
            <button
              onClick={handleSuccessClose}
              className="w-full bg-artra-navy hover:bg-artra-dark-navy text-white font-bold py-3 rounded-lg transition-colors"
            >
              Ir a Mis Compras
            </button>
          </div>
        </div>
      )}

      {/* Modal de Productos */}
      {showProductsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-artra-navy">Productos en tu carrito</h2>
              <button
                onClick={() => setShowProductsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 pb-4 border-b">
                  <img
                    src={item.image || '/api/placeholder/64/64'}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg flex-shrink-0 object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                    <p className="text-sm font-bold text-artra-navy">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editar Dirección */}
      {showAddressModal && selectedAddress && (
        <AddressFormModal
          address={selectedAddress}
          onClose={() => setShowAddressModal(false)}
          onSuccess={() => setShowAddressModal(false)}
        />
      )}
    </Layout>
  );
}
