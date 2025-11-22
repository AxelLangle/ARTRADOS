import { useState } from 'react';
import { ArrowLeft, ArrowRight, Edit, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAddress } from "@/contexts/AddressContext";
import AddressFormModal from "@/components/AddressFormModal";

export default function SelectAddress() {
  const navigate = useNavigate();
  const { addresses, selectedAddress, selectAddress } = useAddress();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);

  const handleNext = () => {
    if (selectedAddress) {
      navigate("/checkout/summary");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-[1230px]">
        <div className="bg-[rgba(183,195,232,0.15)] rounded-[30px] p-8 md:p-16">
          <h1 className="text-artra-navy text-[40px] font-bold mb-4">
            Seleccionar dirección de envio
          </h1>
          <p className="text-black text-2xl mb-12">
            Selecciona la direccion en la que quieres recibir tu pedido
          </p>

          {/* Saved Addresses */}
          <div className="bg-[rgba(183,195,232,0.15)] rounded-2xl p-8">
            <h2 className="text-artra-navy text-[35px] font-bold mb-8">
              Direcciones Guardadas
            </h2>

            <div className="space-y-6">
              {addresses.map((address, index) => (
                <div
                  key={address.id}
                  onClick={() => selectAddress(address.id)}
                  className={`bg-white rounded-xl p-6 border-2 cursor-pointer transition-all ${
                    selectedAddress?.id === address.id
                      ? "border-artra-blue bg-blue-50"
                      : "border-gray-300 hover:border-artra-blue"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-artra-blue text-[28px] font-bold mb-1">
                        {address.name}
                      </p>
                      <p className="text-black text-2xl leading-relaxed">
                        {address.street}, {address.city}, {address.state}, C.P.{" "}
                        {address.postal_code}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingAddress(address);
                      }}
                      className="flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors flex-shrink-0"
                    >
                      <Edit className="w-7 h-7" strokeWidth={2.5} />
                      <span className="text-xl font-bold">Editar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Address Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-4 rounded-2xl bg-artra-navy hover:bg-artra-dark-navy transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span className="text-white text-lg font-bold">
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
              className="flex items-center gap-3 text-artra-navy text-2xl hover:text-artra-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Back Button */}
        <Link
          to="/checkout/payment"
          className="inline-flex items-center gap-2 text-artra-navy hover:text-artra-blue transition-colors mt-8"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-2xl">Volver</span>
        </Link>

        {/* Modales */}
        {showAddModal && (
          <AddressFormModal
            onClose={() => setShowAddModal(false)}
            onSuccess={() => setShowAddModal(false)}
          />
        )}
        {editingAddress && (
          <AddressFormModal
            address={editingAddress}
            onClose={() => setEditingAddress(null)}
            onSuccess={() => setEditingAddress(null)}
          />
        )}
      </div>
    </Layout>
  );
}
