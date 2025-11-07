import { createContext, useContext, useState, ReactNode } from "react";

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  municipality?: string;
  locality?: string;
  colony?: string;
  interiorNumber?: string;
  deliveryInstructions?: string;
  addressType?: "residential" | "commercial";
  fullName?: string;
  phoneNumber?: string;
}

interface AddressContextType {
  addresses: Address[];
  selectedAddress: Address | null;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  selectAddress: (id: string) => void;
  getAddressById: (id: string) => Address | undefined;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Boulevard Felipe Angeles",
      street: "Av. de los Dioses #15, Col. Centro",
      city: "Teotihuacán de Arista",
      state: "México",
      postalCode: "55800",
    },
    {
      id: "2",
      name: "Dirección 2",
      street: "Cerrada de la Laguna #78, Col. San Juan",
      city: "Zumpango de Ocampo",
      state: "México",
      postalCode: "55600",
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddress = {
      ...address,
      id: Date.now().toString(),
    };
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress);
  };

  const updateAddress = (id: string, updatedData: Partial<Address>) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id ? { ...addr, ...updatedData } : addr
      )
    );
    if (selectedAddress?.id === id) {
      setSelectedAddress({ ...selectedAddress, ...updatedData });
    }
  };

  const selectAddress = (id: string) => {
    const address = addresses.find((a) => a.id === id);
    if (address) {
      setSelectedAddress(address);
    }
  };

  const getAddressById = (id: string) => {
    return addresses.find((a) => a.id === id);
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        addAddress,
        updateAddress,
        selectAddress,
        getAddressById,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
}
