import { ArrowLeft, ArrowRight, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { usePayment } from "@/contexts/PaymentContext";

export default function SelectPaymentMethod() {
  const navigate = useNavigate();
  const { paymentMethods, selectedPaymentMethod, selectPaymentMethod } = usePayment();

  const handleNext = () => {
    if (selectedPaymentMethod) {
      navigate("/checkout/address");
    }
  };

  const handlePayPal = () => {
    window.open("https://www.paypal.com", "_blank");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-[1230px]">
        <div className="bg-[rgba(183,195,232,0.15)] rounded-[30px] p-8 md:p-16">
          <h1 className="text-[#14366D] text-[40px] font-extrabold leading-6 mb-4">
            Seleccionar método de pago
          </h1>
          <p className="text-black text-2xl font-normal mb-12">
            Elige el metodo con el que te gustaria pagar tu pedido
          </p>

          {/* Saved Payment Methods */}
          {paymentMethods.length > 0 && (
            <div className="mb-12">
              <h2 className="text-[#14366D] text-[32px] font-bold mb-8 px-4">
                Métodos de pago guardados
              </h2>
              <div className="bg-white border-[3px] border-[#081F44] rounded-2xl p-6">
                <div className="space-y-0">
                  {paymentMethods.map((method, index) => (
                    <div key={method.id}>
                      <button
                        onClick={() => selectPaymentMethod(method.id)}
                        className="w-full flex items-center gap-6 p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-20 h-20 rounded-full border border-[#081F44] flex items-center justify-center flex-shrink-0">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/dc3df3ba014633c561125effca7ae65b4bfe389a?width=138"
                            alt="Visa"
                            className="w-[69px] h-[35px] object-contain rounded-[10.35px]"
                          />
                        </div>
                        <div className="flex-1 text-left flex items-center gap-16">
                          <p className="text-[#4569AD] text-[28px] font-semibold">
                            {method.bank}
                          </p>
                          <p className="text-black text-xl font-normal">{method.cardNumber}</p>
                        </div>
                        <div
                          className={`w-[30px] h-[30px] rounded-full border-[7px] flex-shrink-0 ${
                            selectedPaymentMethod?.id === method.id
                              ? "border-[#1F2F74] bg-[#1F2F74]"
                              : "border-[#1F2F74]"
                          }`}
                        />
                      </button>
                      {index < paymentMethods.length - 1 && (
                        <div className="border-t border-[#7D7979] my-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Add New Payment Method */}
          <div className="px-4">
            <h2 className="text-[#14366D] text-[32px] font-bold mb-8">
              Añadir nuevo método de pago
            </h2>
            <div className="space-y-6">
              <button
                onClick={() => navigate("/checkout/add-card")}
                className="w-full h-20 rounded-[30px] border-2 border-[#14366D] bg-white hover:bg-gray-50 transition-colors flex items-center gap-6 px-8"
              >
                <CreditCard className="w-[50px] h-[36px] text-[#14366D]" strokeWidth={6} />
                <span className="text-[#14366D] text-2xl font-semibold">
                  Agregar nueva tarjeta de credito/debito
                </span>
              </button>

              <button
                onClick={handlePayPal}
                className="w-full h-20 rounded-[30px] border-2 border-[#14366D] bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)] transition-colors flex items-center gap-6 px-8"
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/9406be36187cd4a80d76482cebf1d8eac4317e9b?width=90"
                  alt="PayPal"
                  className="w-11 h-[53px]"
                />
                <span className="text-[28px] font-bold">
                  <span className="text-[#14366D]">Pay</span>
                  <span className="text-[#4569AD]">Pal</span>
                </span>
              </button>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end mt-12 px-4">
            <button
              onClick={handleNext}
              disabled={!selectedPaymentMethod}
              className="flex items-center gap-3 text-[#1F2F74] text-[25px] font-normal hover:text-[#4569AD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Back Button */}
        <Link
          to="/carrito"
          className="inline-flex items-center gap-2 text-[#1F2F74] hover:text-[#4569AD] transition-colors mt-8"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[25px] font-normal">Volver</span>
        </Link>
      </div>
    </Layout>
  );
}
