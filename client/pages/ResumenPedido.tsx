import { useState } from "react";
import { Edit, MapPin, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { usePayment } from "@/contexts/PaymentContext";
import { useAddress } from "@/contexts/AddressContext";
import ProductListModal from "@/components/modals/ProductListModal";
import AddressSelectionModal from "@/components/modals/AddressSelectionModal";
import AddressFormModal from "@/components/modals/AddressFormModal";

export default function OrderSummary() {
  const navigate = useNavigate();
  const { items, total } = useCart();
  const { selectedPaymentMethod } = usePayment();
  const { selectedAddress, addAddress, updateAddress, getAddressById } = useAddress();
  const [showProductList, setShowProductList] = useState(false);
  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const handleConfirm = () => {
    alert("¡Compra confirmada! Gracias por tu compra.");
    navigate("/");
  };

  const handleAddNewAddress = () => {
    setEditingAddressId(null);
    setShowAddressSelection(false);
    setShowAddressForm(true);
  };

  const handleEditAddress = (addressId: string) => {
    setEditingAddressId(addressId);
    setShowAddressSelection(false);
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
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        <h1 className="text-[#14366D] text-[40px] font-extrabold leading-6 mb-12">
          Confirmacion de pedido
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[606px_1fr] gap-8">
          {/* Left Column - Summary Box */}
          <div>
            <div className="bg-[#F7FAFC] border-[3px] border-[#081F44] rounded-2xl p-6">
              <h2 className="text-[#0D121C] text-[28px] font-bold leading-7 mb-6">
                Revisa y confirma
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#476B9E] text-xl font-normal leading-[21px]">
                    Producto
                  </span>
                  <span className="text-[#0D121C] text-xl font-semibold leading-[21px]">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#476B9E] text-xl font-normal leading-[21px]">
                    Envío
                  </span>
                  <span className="text-[#0D121C] text-xl font-semibold leading-[21px]">
                    Gratis
                  </span>
                </div>
              </div>

              <div className="border-t border-[#7D7979] pt-4 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-black text-[26px] font-extrabold leading-[21px]">
                    Pagas
                  </span>
                  <span className="text-[#0D121C] text-xl font-extrabold leading-[21px]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="px-4 py-3">
                <button
                  onClick={handleConfirm}
                  className="w-full h-10 bg-[#081F44] hover:bg-[#1F2F74] transition-colors rounded-lg"
                >
                  <span className="text-[#F7FAFC] text-xl font-bold leading-[21px]">
                    Confirmar compra
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Delivery Details */}
            <div>
              <h2 className="text-[#14366D] text-[35px] font-extrabold mb-6">
                Detalle de la entrega
              </h2>
              <div className="bg-white border-[3px] border-[#081F44] rounded-2xl p-8">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-[19.5px] border border-[#060357] flex items-center justify-center flex-shrink-0">
                    <MapPin
                      className="w-10 h-10 text-[#081F44]"
                      fill="#081F44"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#4569AD] text-[28px] font-semibold mb-2">
                      {selectedAddress?.name || "Boulevard Felipe Angeles"}
                    </p>
                    <p className="text-black text-2xl font-normal">
                      {selectedAddress
                        ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, C.P. ${selectedAddress.postalCode}`
                        : "Av. de los Dioses #15, Col. Centro, Teotihuacán de Arista, México, C.P. 55800"}
                    </p>
                  </div>
                </div>
                <div className="border-t border-[#7D7979] mt-6 pt-6">
                  <button
                    onClick={() => setShowAddressSelection(true)}
                    className="flex items-center gap-3 text-[#1F2F74] hover:text-[#4569AD] transition-colors"
                  >
                    <Edit className="w-[30px] h-[30px]" strokeWidth={4} />
                    <span className="text-xl font-bold">
                      Modificar dirección de envio
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Products to Deliver */}
            <div className="bg-white border-[3px] border-[#081F44] rounded-2xl p-8">
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 rounded-[19.5px] border border-[#060357] flex items-center justify-center flex-shrink-0">
                  <ImageIcon
                    className="w-12 h-12 text-[#081F44]"
                    fill="#081F44"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[#4569AD] text-[28px] font-semibold mb-2">
                    Llega en 3 días a tu domicilio
                  </p>
                  <button
                    onClick={() => setShowProductList(true)}
                    className="text-[#081F44] text-xl font-medium hover:text-[#4569AD] transition-colors"
                  >
                    Mostrar productos
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-black text-[35px] font-extrabold mb-6">
                Detalle del pago
              </h2>
              <div className="bg-white border-[3px] border-[#081F44] rounded-2xl p-8">
                <div className="flex gap-6">
                  <div className="w-[100px] h-[100px] rounded-full border-2 border-[#060357] flex items-center justify-center flex-shrink-0 bg-white">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/2700408bf80c989498ef28ca707906afb1a62e9b?width=158"
                      alt="Visa"
                      className="w-20 h-7"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#4569AD] text-[28px] font-semibold mb-2">
                      {selectedPaymentMethod?.bank || "BBVA"} ****{" "}
                      {selectedPaymentMethod?.cardNumber?.slice(-4) || "5678"}
                    </p>
                    <p className="text-black text-2xl font-normal mb-2">
                      1 mes de ${(total / 1).toFixed(2)}
                    </p>
                    <button className="text-[#081F44] text-xl font-medium hover:text-[#4569AD] transition-colors">
                      Modificar meses
                    </button>
                  </div>
                </div>
                <div className="border-t border-[#7D7979] mt-6 pt-6">
                  <button
                    onClick={() => navigate("/checkout/payment")}
                    className="flex items-center gap-3 text-[#1F2F74] hover:text-[#4569AD] transition-colors"
                  >
                    <Edit className="w-[30px] h-[30px]" strokeWidth={4} />
                    <span className="text-xl font-bold">
                      Modificar forma de pago
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProductListModal
        isOpen={showProductList}
        onClose={() => setShowProductList(false)}
      />
      <AddressSelectionModal
        isOpen={showAddressSelection}
        onClose={() => setShowAddressSelection(false)}
        onAddNew={handleAddNewAddress}
        onEdit={handleEditAddress}
      />
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
