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
          <h1 className="text-artra-navy text-[40px] font-bold mb-4">
            Seleccionar método de pago
          </h1>
          <p className="text-black text-2xl mb-12">
            Elige el metodo con el que te gustaria pagar tu pedido
          </p>

          {/* Saved Payment Methods */}
          {paymentMethods.length > 0 && (
            <div className="mb-12">
              <h2 className="text-artra-navy text-[32px] font-bold mb-6">
                Métodos de pago guardados
              </h2>
              <div className="bg-white border-3 border-artra-dark-navy rounded-2xl p-8">
                <div className="space-y-6">
                  {paymentMethods.map((method, index) => (
                    <div key={method.id}>
                      <button
                        onClick={() => selectPaymentMethod(method.id)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="w-20 h-20 rounded-full border border-artra-dark-navy flex items-center justify-center flex-shrink-0">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/dc3df3ba014633c561125effca7ae65b4bfe389a?width=138"
                            alt="Visa"
                            className="w-16 h-8 object-contain rounded"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-artra-blue text-[28px] font-bold">
                            {method.bank}
                          </p>
                          <p className="text-black text-xl">{method.cardNumber}</p>
                        </div>
                        <div
                          className={`w-8 h-8 rounded-full border-[7px] flex-shrink-0 ${
                            selectedPaymentMethod?.id === method.id
                              ? "border-artra-navy bg-artra-navy"
                              : "border-artra-navy"
                          }`}
                        />
                      </button>
                      {index < paymentMethods.length - 1 && (
                        <div className="border-t border-gray-300 my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Add New Payment Method */}
          <div>
            <h2 className="text-artra-navy text-[32px] font-bold mb-6">
              Añadir nuevo método de pago
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/checkout/add-card")}
                className="w-full h-20 rounded-[30px] border-2 border-artra-navy bg-white hover:bg-gray-50 transition-colors flex items-center gap-4 px-8"
              >
                <CreditCard className="w-12 h-9 text-artra-navy" strokeWidth={3} />
                <span className="text-artra-navy text-2xl font-bold">
                  Agregar nueva tarjeta de credito/debito
                </span>
              </button>

              <button
                onClick={handlePayPal}
                className="w-full h-20 rounded-[30px] border-2 border-artra-navy bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)] transition-colors flex items-center gap-4 px-8"
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/9406be36187cd4a80d76482cebf1d8eac4317e9b?width=90"
                  alt="PayPal"
                  className="w-11 h-13"
                />
                <span className="text-artra-navy text-[28px] font-bold">
                  Pay<span className="text-artra-blue">Pal</span>
                </span>
              </button>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end mt-12">
            <button
              onClick={handleNext}
              disabled={!selectedPaymentMethod}
              className="flex items-center gap-3 text-artra-navy text-2xl hover:text-artra-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Back Button */}
        <Link
          to="/carrito"
          className="inline-flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors mt-8"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-2xl">Volver</span>
        </Link>
      </div>
    </Layout>
  );
}
