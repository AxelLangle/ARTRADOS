import { useState } from "react";
import { X, MapPinned } from "lucide-react";

interface AddressFormData {
  useLocation: boolean;
  street: string;
  noStreetNumber: boolean;
  postalCode: string;
  unknownPostalCode: boolean;
  state: string;
  municipality: string;
  locality: string;
  colony: string;
  interiorNumber: string;
  deliveryInstructions: string;
  addressType: "residential" | "commercial";
  fullName: string;
  phoneNumber: string;
}

interface AddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddressFormData) => void;
  initialData?: Partial<AddressFormData>;
  mode?: "add" | "edit";
}

export default function AddressFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode = "add",
}: AddressFormModalProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    useLocation: false,
    street: initialData?.street || "",
    noStreetNumber: initialData?.noStreetNumber || false,
    postalCode: initialData?.postalCode || "",
    unknownPostalCode: initialData?.unknownPostalCode || false,
    state: initialData?.state || "",
    municipality: initialData?.municipality || "",
    locality: initialData?.locality || "",
    colony: initialData?.colony || "",
    interiorNumber: initialData?.interiorNumber || "",
    deliveryInstructions: initialData?.deliveryInstructions || "",
    addressType: initialData?.addressType || "residential",
    fullName: initialData?.fullName || "",
    phoneNumber: initialData?.phoneNumber || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border-[7px] border-[#4569AD] w-full max-w-[749px] max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[#14366D] text-[28px] font-bold">
              {mode === "add" ? "AGREGAR DIRECCIÓN" : "EDITAR DIRECCIÓN"}
            </h2>
            <button
              onClick={onClose}
              className="text-[#081F44] hover:text-[#4569AD] transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Use My Location Button */}
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, useLocation: !formData.useLocation })
              }
              className="flex items-center gap-2"
            >
              <div className="relative w-11 h-11">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-11 bg-[#081F44] rounded-full"></div>
                  <div className="w-11 h-1 bg-[#081F44] rounded-full absolute"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full border-2 border-[#081F44] bg-white"></div>
                  <div className="w-4 h-4 rounded-full bg-[#081F44] absolute"></div>
                </div>
              </div>
              <span className="text-[#081F44] text-2xl font-bold">
                Usar mi ubicación
              </span>
            </button>

            {/* Street Address */}
            <div className="space-y-2">
              <label className="text-[#14366D] text-2xl font-bold">
                Dirección o lugar de entrega
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                placeholder="Ej: Avenida de los leones 4563"
                className="w-full h-[70px] rounded-2xl border-[1.5px] border-[#081F44] bg-[rgba(217,217,217,0.63)] px-6 text-base placeholder:text-black/60"
              />
              <label className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={formData.noStreetNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      noStreetNumber: e.target.checked,
                    })
                  }
                  className="w-[30px] h-[30px] rounded-full border-4 border-[#081F44] bg-[#D9D9D9]"
                />
                <span className="text-[#14366D] text-base font-medium">
                  Mi calle no tiene numero
                </span>
              </label>
            </div>

            {/* Postal Code */}
            <div className="space-y-2">
              <label className="text-[#14366D] text-2xl font-bold">
                Código postal
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                  placeholder="Ej: 55607"
                  className="w-full h-[70px] rounded-2xl border-[1.5px] border-[#081F44] bg-[#D9D9D9] px-6 text-base placeholder:text-black/60"
                />
                <label className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-black text-base">No se mi CP</span>
                  <input
                    type="checkbox"
                    checked={formData.unknownPostalCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unknownPostalCode: e.target.checked,
                      })
                    }
                    className="w-[30px] h-[30px] rounded-full border-4 border-[#14366D] bg-[#D9D9D9]"
                  />
                </label>
              </div>
            </div>

            {/* State and Municipality */}
            <div className="grid grid-cols-2 gap-[54px]">
              <div className="space-y-2">
                <label className="text-[#14366D] text-2xl font-bold">
                  Estado
                </label>
                <select
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="w-full h-[70px] rounded-2xl border-[1.5px] border-[#081F44] bg-[#D9D9D9] px-6 text-base appearance-none"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="México">México</option>
                  <option value="Ciudad de México">Ciudad de México</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[#14366D] text-2xl font-bold">
                  Municipio o alcaldía
                </label>
                <select
                  value={formData.municipality}
                  onChange={(e) =>
                    setFormData({ ...formData, municipality: e.target.value })
                  }
                  className="w-full h-[70px] rounded-2xl border border-black bg-[#D9D9D9] px-6 text-base appearance-none"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Teotihuacán">Teotihuacán</option>
                </select>
              </div>
            </div>

            {/* Locality and Colony */}
            <div className="grid grid-cols-2 gap-[54px]">
              <div className="space-y-2">
                <label className="text-[#14366D] text-2xl font-bold">
                  Localidad
                </label>
                <select
                  value={formData.locality}
                  onChange={(e) =>
                    setFormData({ ...formData, locality: e.target.value })
                  }
                  className="w-full h-[70px] rounded-2xl border-[1.5px] border-[#081F44] bg-[#D9D9D9] px-6 text-base appearance-none"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Centro">Centro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[#14366D] text-2xl font-bold">
                  Colonia o Barrio
                </label>
                <select
                  value={formData.colony}
                  onChange={(e) =>
                    setFormData({ ...formData, colony: e.target.value })
                  }
                  className="w-full h-[70px] rounded-2xl border-[1.5px] border-[#081F44] bg-[#D9D9D9] px-6 text-base appearance-none"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Centro">Centro</option>
                </select>
              </div>
            </div>

            {/* Interior Number */}
            <div className="space-y-2">
              <label className="text-[#14366D] text-2xl font-bold">
                Número interior / Departamento (opcional)
              </label>
              <input
                type="text"
                value={formData.interiorNumber}
                onChange={(e) =>
                  setFormData({ ...formData, interiorNumber: e.target.value })
                }
                placeholder="Ej: 201"
                className="w-full h-[70px] rounded-2xl border-[1.5px] border-[#081F44] bg-[#D9D9D9] px-6 text-base placeholder:text-black/60"
              />
            </div>

            {/* Delivery Instructions */}
            <div className="space-y-2">
              <label className="text-[#14366D] text-2xl font-bold">
                Indicaciones para la entrega (opcional)
              </label>
              <textarea
                value={formData.deliveryInstructions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deliveryInstructions: e.target.value,
                  })
                }
                placeholder="Ej: Entre calles, color del edificio, no tiene timbre"
                rows={6}
                className="w-full rounded-2xl border border-black bg-[#D9D9D9] p-4 text-base placeholder:text-black/60 resize-none"
              />
            </div>

            {/* Address Type */}
            <div className="space-y-4">
              <label className="text-[#14366D] text-2xl font-bold">
                Tipo de domicilio
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="addressType"
                    value="residential"
                    checked={formData.addressType === "residential"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        addressType: e.target.value as "residential",
                      })
                    }
                    className="w-[30px] h-[30px] rounded-full border-4 border-[#081F44] bg-[#D9D9D9]"
                  />
                  <span className="text-black text-base font-medium">
                    Residencial
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="addressType"
                    value="commercial"
                    checked={formData.addressType === "commercial"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        addressType: e.target.value as "commercial",
                      })
                    }
                    className="w-[30px] h-[30px] rounded-full border-4 border-[#081F44] bg-[#D9D9D9]"
                  />
                  <span className="text-black text-base">Laboral</span>
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[#14366D] text-2xl font-bold">
                Nombre y Apellido
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Ingrese un nombre y apellido"
                className="w-full h-[70px] rounded-2xl border-[1.5px] border-[#081F44] bg-[#D9D9D9] px-6 text-base placeholder:text-black/60"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-[#14366D] text-2xl font-bold">
                Numero de telefono
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="Ingrese un numero de teléfono"
                className="w-full h-[70px] rounded-2xl border-[1.5px] border-[#081F44] bg-[#D9D9D9] px-6 text-base placeholder:text-black/60"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-[57px] pt-6">
              <button
                type="button"
                onClick={onClose}
                className="w-[240px] h-[68px] rounded-2xl bg-[#D9D9D9] hover:bg-[#CACACA] transition-colors"
              >
                <span className="text-black text-2xl font-bold">Cancelar</span>
              </button>
              <button
                type="submit"
                className="w-[240px] h-[68px] rounded-2xl bg-[#060357] hover:bg-[#1F2F74] transition-colors"
              >
                <span className="text-[#F7FAFC] text-[25px] font-bold">
                  Guardar
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
