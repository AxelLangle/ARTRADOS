import { Edit, MapPin, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { usePayment } from "@/contexts/PaymentContext";
import { useAddress } from "@/contexts/AddressContext";

export default function OrderSummary() {
  const navigate = useNavigate();
  const { items, total } = useCart();
  const { selectedPaymentMethod } = usePayment();
  const { selectedAddress } = useAddress();

  const handleConfirm = () => {
    alert("¡Compra confirmada!");
    navigate("/");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        <h1 className="text-artra-navy text-[40px] font-bold mb-12">
          Confirmacion de pedido
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      {selectedAddress?.state}, C.P. {selectedAddress?.postalCode}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-300 mt-6 pt-6">
                  <button
                    onClick={() => navigate("/checkout/address")}
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
                <div className="w-20 h-20 rounded-[19.5px] border border-[#060357] flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-12 h-12 text-artra-dark-navy" fill="#081F44" />
                </div>
                <div className="flex-1">
                  <p className="text-artra-blue text-[28px] font-bold mb-2">
                    Llega en 3 días a tu domicilio
                  </p>
                  <button className="text-artra-dark-navy text-xl hover:text-artra-blue transition-colors">
                    Mostrar productos
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
                    <p className="text-black text-2xl mb-2">1 mes de $765.18</p>
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
    </Layout>
  );
}
