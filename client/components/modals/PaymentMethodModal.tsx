import { X, CreditCard, ArrowRight } from "lucide-react";
import { useState } from "react";
import { usePayment } from "@/contexts/PaymentContext";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewCard: () => void;
}

export default function PaymentMethodModal({
  isOpen,
  onClose,
  onAddNewCard,
}: PaymentMethodModalProps) {
  const { paymentMethods, selectedPaymentMethod, selectPaymentMethod } =
    usePayment();
  const [selectedId, setSelectedId] = useState(
    selectedPaymentMethod?.id || ""
  );

  const handleSelectAndContinue = () => {
    if (selectedId) {
      selectPaymentMethod(selectedId);
      onClose();
    }
  };

  const handleAddCard = () => {
    onClose();
    onAddNewCard();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[30px] w-full max-w-[1230px] max-h-[90vh] overflow-y-auto shadow-lg relative">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-[#14366D] text-[40px] font-extrabold leading-6 mb-4">
                Seleccionar método de pago
              </h2>
              <p className="text-black text-2xl font-normal">
                Elige el metodo con el que te gustaria pagar tu pedido
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#081F44] hover:text-[#4569AD] transition-colors flex-shrink-0"
            >
              <X className="w-10 h-10" />
            </button>
          </div>

          <div className="max-w-[813px] mx-auto space-y-12 mt-16">
            {/* Saved Payment Methods */}
            <div>
              <h3 className="text-[#14366D] text-[32px] font-bold mb-8">
                Métodos de pago guardados
              </h3>

              <div className="bg-white border-[3px] border-[#081F44] rounded-2xl p-8">
                <div className="space-y-6">
                  {paymentMethods.map((method) => (
                    <div key={method.id}>
                      <button
                        onClick={() => setSelectedId(method.id)}
                        className="flex items-center gap-6 w-full text-left"
                      >
                        {/* Card Logo */}
                        <div className="w-20 h-20 rounded-full border border-[#081F44] flex items-center justify-center flex-shrink-0 bg-white">
                          <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/dc3df3ba014633c561125effca7ae65b4bfe389a?width=138"
                            alt="Visa"
                            className="w-[69px] h-[35px] rounded-[10.35px]"
                          />
                        </div>

                        {/* Card Details */}
                        <div className="flex-1">
                          <p className="text-[#4569AD] text-[28px] font-semibold">
                            {method.bank} **** {method.cardNumber.slice(-4)}
                          </p>
                        </div>

                        {/* Radio Button */}
                        <div
                          className={`w-[30px] h-[30px] rounded-full border-[7px] flex-shrink-0 transition-colors ${
                            selectedId === method.id
                              ? "border-[#1F2F74] bg-white"
                              : "border-[#1F2F74] bg-white"
                          }`}
                        >
                          {selectedId === method.id && (
                            <div className="w-full h-full rounded-full bg-[#1F2F74]"></div>
                          )}
                        </div>
                      </button>

                      {paymentMethods.indexOf(method) <
                        paymentMethods.length - 1 && (
                        <div className="border-t border-[#7D7979] my-6"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Add New Payment Method */}
            <div>
              <h3 className="text-[#14366D] text-[32px] font-bold mb-8">
                Añadir nuevo método de pago
              </h3>

              <div className="space-y-6">
                {/* Add Credit/Debit Card */}
                <button
                  onClick={handleAddCard}
                  className="w-full h-20 rounded-[30px] border-2 border-[#14366D] bg-white hover:bg-[#F7FAFC] transition-colors flex items-center gap-6 px-12"
                >
                  <CreditCard
                    className="w-[50px] h-9 text-[#14366D]"
                    strokeWidth={6}
                  />
                  <span className="text-[#14366D] text-2xl font-semibold">
                    Agregar nueva tarjeta de credito/debito
                  </span>
                </button>

                {/* PayPal */}
                <button className="w-full h-20 rounded-[30px] border-2 border-[#14366D] bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)] transition-colors flex items-center gap-6 px-12 opacity-50 cursor-not-allowed">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/9406be36187cd4a80d76482cebf1d8eac4317e9b?width=90"
                    alt="PayPal"
                    className="w-[45px] h-[53px]"
                  />
                  <span className="text-[#14366D] text-[28px] font-bold">
                    Pay<span className="text-[#4569AD]">Pal</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-8">
              <button
                onClick={handleSelectAndContinue}
                disabled={!selectedId}
                className="flex items-center gap-3 text-[#1F2F74] text-[25px] font-normal hover:text-[#4569AD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
