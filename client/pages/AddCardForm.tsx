import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import { usePayment } from "@/contexts/PaymentContext";

export default function AddCardForm() {
  const navigate = useNavigate();
  const { addPaymentMethod } = usePayment();
  const [saveCard, setSaveCard] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardHolder: "",
  });

  const handleSubmit = () => {
    if (saveCard && formData.cardNumber) {
      addPaymentMethod({
        type: "card",
        cardNumber: `**** ${formData.cardNumber.slice(-4)}`,
        cardHolder: formData.cardHolder,
        expiryDate: formData.expiryDate,
        bank: "BBVA",
      });
    }
    navigate("/checkout/payment");
  };

  const handleCancel = () => {
    navigate("/checkout/payment");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-[1230px]">
        <div className="bg-[rgba(183,195,232,0.15)] rounded-[30px] p-8 md:p-16">
          <div className="max-w-[970px]">
            <h1 className="text-[#14366D] text-[40px] font-extrabold leading-6 mb-4">
              Agregar nueva tarjeta
            </h1>
            <p className="text-black text-2xl font-normal mb-16">
              Ingresa los datos de tu tarjeta de crédito / debito
            </p>

            <div className="space-y-8 pl-12">
              {/* Card Number */}
              <div>
                <label className="block text-[#14366D] text-2xl font-bold leading-[21px] mb-4">
                  Número de tarjeta
                </label>
                <input
                  type="text"
                  placeholder="0000  0000  0000  0000"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  className="w-[850px] max-w-full h-[70px] px-10 rounded-2xl border-[1.5px] border-[#081F44] bg-[rgba(255,255,255,0.63)] text-xl text-black placeholder:text-[#8EA2D7] placeholder:tracking-[5px] focus:outline-none focus:ring-2 focus:ring-[#4569AD]"
                />
              </div>

              {/* Expiry Date and CVC */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#14366D] text-2xl font-bold leading-[21px] mb-4">
                    Fecha de vencimiento
                  </label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                    className="w-[380px] max-w-full h-[70px] px-6 rounded-2xl border-[1.5px] border-[#081F44] bg-white text-xl text-black placeholder:text-[#8EA2D7] focus:outline-none focus:ring-2 focus:ring-[#4569AD]"
                  />
                </div>
                <div>
                  <label className="block text-[#14366D] text-2xl font-bold leading-[21px] mb-4">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    value={formData.cvc}
                    onChange={(e) =>
                      setFormData({ ...formData, cvc: e.target.value })
                    }
                    className="w-[380px] max-w-full h-[70px] px-6 rounded-2xl border border-black bg-white text-xl text-black placeholder:text-[#8EA2D7] focus:outline-none focus:ring-2 focus:ring-[#4569AD]"
                  />
                </div>
              </div>

              {/* Card Holder */}
              <div>
                <label className="block text-[#14366D] text-2xl font-bold leading-[21px] mb-4">
                  Titular de la tarjeta
                </label>
                <input
                  type="text"
                  placeholder="Ingresar nombre del  titular de la tarjeta"
                  value={formData.cardHolder}
                  onChange={(e) =>
                    setFormData({ ...formData, cardHolder: e.target.value })
                  }
                  className="w-[850px] max-w-full h-[70px] px-10 rounded-2xl border-[1.5px] border-[#081F44] bg-[rgba(255,255,255,0.63)] text-xl text-black placeholder:text-[#8EA2D7] focus:outline-none focus:ring-2 focus:ring-[#4569AD]"
                />
              </div>

              {/* Save Card Checkbox */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSaveCard(!saveCard)}
                  className={`w-[30px] h-[30px] rounded-[2px] border-2 border-[#081F44] flex items-center justify-center transition-colors ${
                    saveCard ? "bg-[#081F44]" : "bg-white"
                  }`}
                >
                  {saveCard && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M15 4.5L6.75 12.75L3 9"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <span className="text-black text-xl font-normal">
                  Guardar tarjeta para futuras compras
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-[188px] pt-16">
                <button
                  onClick={handleCancel}
                  className="w-60 h-[68px] rounded-2xl bg-[#D9D9D9] hover:bg-gray-400 transition-colors"
                >
                  <span className="text-black text-2xl font-bold leading-[21px]">
                    Cancelar
                  </span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-60 h-[68px] rounded-2xl bg-[#060357] hover:bg-[#14366D] transition-colors"
                >
                  <span className="text-[#F7FAFC] text-[25px] font-bold leading-[21px]">
                    Guardar
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Link
          to="/checkout/payment"
          className="inline-flex items-center gap-2 text-[#1F2F74] hover:text-[#4569AD] transition-colors mt-8"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[25px] font-normal">Volver</span>
        </Link>
      </div>
    </Layout>
  );
}
