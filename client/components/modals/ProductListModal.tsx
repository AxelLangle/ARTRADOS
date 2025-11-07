import { X, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductListModal({
  isOpen,
  onClose,
}: ProductListModalProps) {
  const { items } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#D9D9D9] rounded-2xl w-full max-w-[746px] max-h-[90vh] overflow-y-auto relative">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[#081F44] text-[35px] font-extrabold">
              Productos del envio
            </h2>
            <button
              onClick={onClose}
              className="text-[#081F44] hover:text-[#4569AD] transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
          </div>

          {/* Product List */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border-[1.5px] border-[#14366D] p-4 flex gap-4"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[78px] h-[78px] rounded-2xl object-cover flex-shrink-0"
                />

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#14366D] text-lg font-bold mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-[#8EA2D7] text-base font-medium">
                    Precio unitario: ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity and Total */}
                <div className="flex flex-col items-end justify-center gap-1 flex-shrink-0">
                  <p className="text-[#081F44] text-base font-medium text-center">
                    Cantidad: {item.quantity}
                  </p>
                  <p className="text-[#081F44] text-base font-bold text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-4 mt-8 text-[#1F2F74] hover:text-[#4569AD] transition-colors"
          >
            <ArrowLeft className="w-[15px] h-[15px]" strokeWidth={2.5} />
            <span className="text-[25px] font-normal">Volver</span>
          </button>
        </div>
      </div>
    </div>
  );
}
