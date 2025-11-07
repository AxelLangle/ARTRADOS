import { X, ArrowLeft, Edit } from "lucide-react";
import { useAddress } from "@/contexts/AddressContext";

interface AddressSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNew: () => void;
  onEdit: (addressId: string) => void;
}

export default function AddressSelectionModal({
  isOpen,
  onClose,
  onAddNew,
  onEdit,
}: AddressSelectionModalProps) {
  const { addresses, selectAddress } = useAddress();

  const handleSelectAddress = (addressId: string) => {
    selectAddress(addressId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#D9D9D9] rounded-2xl border-[7px] border-[#4569AD] w-full max-w-[1036px] max-h-[90vh] overflow-y-auto shadow-lg relative">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[#14366D] text-[35px] font-extrabold">
              Direcciones
            </h2>
            <button
              onClick={onClose}
              className="text-[#081F44] hover:text-[#4569AD] transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
          </div>

          {/* Address List - First Address */}
          <div className="space-y-8">
            {addresses.slice(0, 1).map((address, index) => (
              <div
                key={address.id}
                className="bg-white rounded-2xl border-[5px] border-[#14366D] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <button
                    onClick={() => handleSelectAddress(address.id)}
                    className="flex-1 text-left"
                  >
                    <p className="text-[#4569AD] text-[28px] font-semibold mb-1">
                      Dirección {index + 1}:{" "}
                      {address.street.split(",")[0] || address.name}
                    </p>
                    <p className="text-black text-2xl font-normal leading-relaxed">
                      {address.street}, {address.city}, {address.state}, C.P.{" "}
                      {address.postalCode}
                    </p>
                  </button>
                  <button
                    onClick={() => onEdit(address.id)}
                    className="flex items-center gap-2 text-[#14366D] hover:text-[#4569AD] transition-colors flex-shrink-0"
                  >
                    <Edit className="w-[30px] h-[30px]" strokeWidth={4} />
                    <span className="text-xl font-bold">Editar</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Second Address (if exists) */}
            {addresses.slice(1).map((address, index) => (
              <div
                key={address.id}
                className="bg-white rounded-2xl border-[1.5px] border-[#14366D] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <button
                    onClick={() => handleSelectAddress(address.id)}
                    className="flex-1 text-left"
                  >
                    <p className="text-[#4569AD] text-[28px] font-semibold mb-1">
                      Dirección {index + 2}:{" "}
                    </p>
                    <p className="text-black text-2xl font-normal leading-relaxed">
                      {address.street}, {address.city}, {address.state}, C.P.{" "}
                      {address.postalCode}
                    </p>
                  </button>
                  <button
                    onClick={() => onEdit(address.id)}
                    className="flex items-center gap-2 text-[#14366D] hover:text-[#4569AD] transition-colors flex-shrink-0"
                  >
                    <Edit className="w-[30px] h-[30px]" strokeWidth={4} />
                    <span className="text-xl font-bold">Editar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Address Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={onAddNew}
              className="px-6 py-[23px] rounded-2xl bg-[#14366D] hover:bg-[#1F2F74] transition-colors h-[68px]"
            >
              <span className="text-white text-lg font-bold leading-[21px]">
                Agregar nueva dirección
              </span>
            </button>
          </div>

          {/* Back Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 mt-8 text-[#1F2F74] hover:text-[#4569AD] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
            <span className="text-[25px] font-normal">Volver</span>
          </button>
        </div>
      </div>
    </div>
  );
}
