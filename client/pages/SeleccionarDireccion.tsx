import { useState } from "react";
import { ArrowLeft, ArrowRight, Edit } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAddress } from "@/contexts/AddressContext";
import AddressFormModal from "@/components/modals/AddressFormModal";

export default function SelectAddress() {
  const navigate = useNavigate();
  const {
    addresses,
    selectedAddress,
    selectAddress,
    addAddress,
    updateAddress,
    getAddressById,
  } = useAddress();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedAddress) {
      navigate("/checkout/summary");
    }
  };

  const handleAddNewAddress = () => {
    setEditingAddressId(null);
    setShowAddressForm(true);
  };

  const handleEditAddress = (addressId: string) => {
    setEditingAddressId(addressId);
    setShowAddressForm(true);
  };

  const handleSaveAddress = (formData: any) => {
    if (editingAddressId) {
      // Update existing address
      updateAddress(editingAddressId, {
        street: formData.street,
        state: formData.state,
        postalCode: formData.postalCode,
        municipality: formData.municipality,
        locality: formData.locality,
        colony: formData.colony,
        interiorNumber: formData.interiorNumber,
        deliveryInstructions: formData.deliveryInstructions,
        addressType: formData.addressType,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        name: formData.fullName || "Dirección",
        city: formData.locality || "",
      });
    } else {
      // Add new address
      addAddress({
        name: formData.fullName || "Nueva Dirección",
        street: formData.street,
        city: formData.locality || "",
        state: formData.state,
        postalCode: formData.postalCode,
        municipality: formData.municipality,
        locality: formData.locality,
        colony: formData.colony,
        interiorNumber: formData.interiorNumber,
        deliveryInstructions: formData.deliveryInstructions,
        addressType: formData.addressType,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
      });
    }
    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  const getAddressFormInitialData = () => {
    if (!editingAddressId) return undefined;
    const address = getAddressById(editingAddressId);
    if (!address) return undefined;
    return {
      street: address.street,
      postalCode: address.postalCode,
      state: address.state,
      municipality: address.municipality,
      locality: address.locality,
      colony: address.colony,
      interiorNumber: address.interiorNumber,
      deliveryInstructions: address.deliveryInstructions,
      addressType: address.addressType,
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
    };
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-[1230px]">
        <div className="bg-[rgba(183,195,232,0.15)] rounded-[30px] p-8 md:p-16">
          <h1 className="text-[#14366D] text-[40px] font-extrabold leading-6 mb-4">
            Seleccionar dirección de envio
          </h1>
          <p className="text-black text-2xl font-normal mb-12">
            Selecciona la direccion en la que quieres recibir tu pedido
          </p>

          {/* Saved Addresses */}
          <div className="bg-[rgba(183,195,232,0.15)] rounded-2xl p-8">
            <h2 className="text-[#14366D] text-[35px] font-extrabold mb-8">
              Direcciones Guardadas
            </h2>

            <div className="space-y-6">
              {addresses.map((address, index) => (
                <div
                  key={address.id}
                  className="bg-white rounded-xl border-[1.5px] border-[#14366D] p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <button
                      onClick={() => selectAddress(address.id)}
                      className="flex-1 text-left"
                    >
                      <p className="text-[#4569AD] text-[28px] font-semibold mb-1">
                        Dirección {index + 1}: {address.name}
                      </p>
                      <p className="text-black text-2xl font-normal leading-relaxed">
                        {address.street}, {address.city}, {address.state}, C.P.{" "}
                        {address.postalCode}
                      </p>
                    </button>
                    <button
                      onClick={() => handleEditAddress(address.id)}
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
                onClick={handleAddNewAddress}
                className="px-6 py-[23px] rounded-2xl bg-[#14366D] hover:bg-[#1F2F74] transition-colors h-[68px]"
              >
                <span className="text-white text-lg font-bold leading-[21px]">
                  Agregar nueva dirección
                </span>
              </button>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end mt-12">
            <button
              onClick={handleNext}
              disabled={!selectedAddress}
              className="flex items-center gap-3 text-[#1F2F74] text-[25px] font-normal hover:text-[#4569AD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </button>
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

      {/* Address Form Modal */}
      <AddressFormModal
        isOpen={showAddressForm}
        onClose={() => {
          setShowAddressForm(false);
          setEditingAddressId(null);
        }}
        onSave={handleSaveAddress}
        initialData={getAddressFormInitialData()}
        mode={editingAddressId ? "edit" : "add"}
      />
    </Layout>
  );
}
